import { ToastId, UseToastOptions } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

import { POST_CODES_ROUTE } from '@/lib/server-route';

import {
  AppUserWithToken,
  ScholarshipCodeWithPassport,
  ScholarshipPeriod,
} from '@/types/app.types';

export function createOnSubmitHandler(
  setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  codes: ScholarshipCodeWithPassport[],
  toast: (opt?: UseToastOptions) => ToastId,
  user: AppUserWithToken,
  period: ScholarshipPeriod | undefined,
  setCodes: Dispatch<SetStateAction<ScholarshipCodeWithPassport[]>>,
) {
  return async () => {
    setIsSubmitting(true);
    if (codes.length === 0) {
      toast({
        title: 'Aucun code à importer',
        status: 'error',
        description: 'Veuillez importer des codes avant de continuer',
      });
      return;
    }
    try {
      const response = await fetch(POST_CODES_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ codes, period }),
      });

      if (response.status === 200) {
        toast({
          title: 'Codes importés',
          status: 'success',
          description:
            'Les codes ont été importés avec succès, ils sont disponibles dans la liste des codes',
        });
        setCodes([]);
        setIsSubmitting(false);
        return;
      }
      if (response.status === 202) {
        toast({
          title: 'Importation en cours...',
          status: 'info',
          description:
            "Les codes sont en cours d'importation, vous receverez une notification lorsque l'importation sera terminée",
        });
        setCodes([]);
        return;
      }
      const resJson = (await response.json()) as {
        message: string;
        code: number;
      };
      toast({
        title: "Erreur d'importation",
        status: 'error',
        description: resJson.message || 'Une erreur est survenue',
      });
      setIsSubmitting(false);
    } catch (error) {
      const message = (error as Error).message || 'Une erreur est survenue';
      toast({ title: 'Erreur', status: 'error', description: message });
      setIsSubmitting(false);
    }
  };
}
