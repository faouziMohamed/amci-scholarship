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
          duration: 10_000,
          status: 'error',
        });
        return;
      }
      void readCsvFile(
        acceptedFiles,
        toast,
        setProcessingPreview,
        period,
        setCodes,
      );
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

async function readCsvFile(
  acceptedFiles: File[],
  toast: (opt?: UseToastOptions) => string | number | undefined,
  setProcessing: (value: boolean) => void,
  period: ScholarshipPeriod,
  setCodes: (codes: ScholarshipCodeWithPassport[]) => void,
) {
  for (const file of acceptedFiles) {
    try {
      // The 'await' in the loop is intentional here since we want to read the files one by one and not all at once
      // eslint-disable-next-line no-await-in-loop
      const text = await file.text();
      setProcessing(true);
      const csv = text.trim().replaceAll('\r', '').split('\n');
      const rowsProcessed: ScholarshipCodeWithPassport[] = [];
      for (const row of csv) {
        const oneRow = row.split(',') as ScholarshipCodeRow;
        const codeRow = csvToScholarshipCode(oneRow, period);
        rowsProcessed.push(codeRow);
      }
      toast({
        title: 'Fichier chargé',
        description: 'Le fichier a été chargé avec succès',
        duration: 10_000,
      });
      setProcessing(false);
      setCodes(rowsProcessed);
    } catch {
      toast({
        title: 'Fichier non chargé',
        status: 'error',
        description: 'Une erreur est survenue lors du chargement du fichier',
      });
    }
  }
}
