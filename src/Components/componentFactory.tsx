import { chakra, ToastId, UseToastOptions } from '@chakra-ui/react';
import { IoCopy } from 'react-icons/io5';

import { capitalizeEachWord, copyToClipboard, formatNumber } from '@/lib/utils';

import useAppToast from '@/Components/useAppToast';

import { ScholarshipCode } from '@/types/app.types';

export const CopyToClipboardIcon = chakra(IoCopy);

export function useCopyToClipBoardToast() {
  return useAppToast({
    title: 'Code copié',
    position: 'top',
    status: 'success',
    description: 'Le code a été copié dans le presse-papier',
    duration: 5000,
  });
}

export function getRowTitle(code: ScholarshipCode) {
  return `Code disponible pour ${capitalizeEachWord(code.name)} de matricule ${
    code.matricule
  }`;
}

export function getScholarshipCodeTitle(code: ScholarshipCode) {
  return (
    'Cliquez pour copier le code dans le presse-papier ' +
    `${code.periodCode}/${code.scholarshipCode}`
  );
}

export function copyCodeToClipboard(
  code: ScholarshipCode,
  toast: (opt?: UseToastOptions) => ToastId,
) {
  return async () => {
    const toCopy = `${code.periodCode}/${code.scholarshipCode}`;
    await copyToClipboard(toCopy);
    toast();
  };
}

export function getFormattedScholarshipCode(code: ScholarshipCode) {
  return `${code.periodCode} / ${formatNumber(code.scholarshipCode)}`;
}

export function getListAriaLabel(totalCount: number) {
  return `Liste des codes de bourses pour ${totalCount} étudiants`;
}
