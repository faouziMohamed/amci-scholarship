import { UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

import { csvToScholarshipCode } from '@/lib/utils';

import { useCopyToClipBoardToast } from '@/Components/componentFactory';

import {
  ScholarshipCodeRow,
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
} from '@/types/app.types';

export function useCsvFileReading(
  setCodes: (codes: ScholarshipCodeWithPassport[]) => void,
  period: ScholarshipPeriod,
  setProcessingPreview: (value: boolean) => void,
) {
  const toast = useCopyToClipBoardToast();
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        toast({
          title: 'Fichier non chargé',
          description:
            "Le fichier n'a pas été chargé car il ne s'agit pas d'un fichier CSV",
          duration: 10000,
          status: 'error',
        });
        return;
      }
      readCsvFile(acceptedFiles, toast, setProcessingPreview, period, setCodes);
    },
    [period, setCodes, setProcessingPreview, toast],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  });
  return { toast, getRootProps, getInputProps, isDragActive };
}

function readCsvFile(
  acceptedFiles: File[],
  toast: (opt?: UseToastOptions) => string | number | undefined,
  setProcessing: (value: boolean) => void,
  period: ScholarshipPeriod,
  setCodes: (codes: ScholarshipCodeWithPassport[]) => void,
) {
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();

    reader.onabort = () => {
      toast({
        title: 'Chargement du fichier annulé',
        status: 'error',
        description: 'Le chargement du fichier a été annulé',
      });
    };
    reader.onerror = () => {
      toast({
        title: 'Fichier non chargé',
        status: 'error',
        description: 'Une erreur est survenue lors du chargement du fichier',
      });
    };
    reader.onload = () => {
      setProcessing(true);
      const csv = (reader.result as string)
        .trim()
        .replaceAll('\r', '')
        .split('\n');
      const rowsProcessed: ScholarshipCodeWithPassport[] = [];
      csv.forEach((row) => {
        const oneRow = row.split(',') as ScholarshipCodeRow;
        const codeRow = csvToScholarshipCode(oneRow, period);

        rowsProcessed.push(codeRow);
      });
      toast({
        title: 'Fichier chargé',
        description: 'Le fichier a été chargé avec succès',
        duration: 10000,
      });
      setProcessing(false);
      setCodes(rowsProcessed);
    };
    reader.readAsText(file);
  });
}
