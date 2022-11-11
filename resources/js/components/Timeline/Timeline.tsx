import React from 'react';
import {Button, GridItem, H3, Link, Small, Text} from '@bigcommerce/big-design';
import {Circle, GridItemDate, GridItemDescription, GridItemLine, StyledBox, StyledGrid} from './styled';
import {TimelineAction, TimelineItem} from '../../types';


interface Props {
  items: TimelineItem[],
  actions: TimelineAction[]
}

const Timeline = ({items, actions}: Props) => {

  const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};

  return (
    <StyledBox>
      {
        items && items.map(({id, publicationTime, title, description, url}, index) => {
          const publicationDate = new Date(publicationTime);
          // @ts-ignore
          const publicationDateString = new Intl.DateTimeFormat('en-US', dateOptions).format(publicationDate);

          return (
            <StyledGrid onClick={() => window.open(url, '_blank')} key={id ?? index}>
              <GridItemDate>
                <Text>{publicationDateString}</Text>
              </GridItemDate>
              <GridItemLine>
                <Circle />
              </GridItemLine>
              <GridItemDescription>
                <H3><Link href={url} target="_blank">{title}</Link></H3>
                <Small>{description}</Small>
              </GridItemDescription>
            </StyledGrid>
          )
        })
      }
      <StyledGrid>
        <GridItem />
        <GridItem />
        <GridItem marginTop="xxLarge">
          {
            actions && actions.map(({label, onClick}, index) => (
              <Button key={index} onClick={onClick} variant={index > 0 ? 'subtle' : 'secondary'}>{label}</Button>
            ))
          }
        </GridItem>
      </StyledGrid>
    </StyledBox>
  );
}


export default Timeline;
