import { Divider, List, ListItem } from '@chakra-ui/react';

import DisplayListResult from '@/app/(landing_page)/DisplaySimpleResult';
import { getListAriaLabel } from '@/Components/componentFactory';

import { ScholarshipCode } from '@/types/app.types';

export default function ShowListResult({
  totalCount,
  codes,
}: {
  totalCount: number;
  codes: ScholarshipCode[];
}) {
  return (
    <List tabIndex={0} rounded='md' aria-label={getListAriaLabel(totalCount)}>
      {codes.map((code, index) => (
        <ListItem
          key={code.matricule}
          _hover={{ bg: 'gray.100' }}
          sx={{
            w: '100%',
            display: 'flex',
            flexDirection: 'column',
            _first: { borderTopRadius: 'md' },
            _last: { borderBottomRadius: 'md' },
            '&:first-of-type button': {
              borderTopRadius: index === 0 ? 'lg' : 0,
            },
            '&:last-of-type button': {
              borderBottomRadius: index === codes.length - 1 ? 'lg' : 0,
            },
          }}
        >
          <DisplayListResult code={code} />
          {index + 1 <= codes.length - 1 && (
            <Divider borderColor='#edf2f7' flexShrink={0} />
          )}
        </ListItem>
      ))}
    </List>
  );
}
