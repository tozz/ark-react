import { styled } from '@stitches/react';
import * as TabsPrimitives from '@radix-ui/react-tabs';

export const Tabs = styled(TabsPrimitives.Tabs, {
  aspectRatio: '16/9',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 0 2rem 0',
  maxWidth: '1024px',
  width: '100%',
  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)'
});

export const TabsList = styled(TabsPrimitives.List, {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'stretch',
  borderBottom: '1px solid rgb(230, 230, 230)',
});

export const TabsTrigger = styled(TabsPrimitives.Trigger, {
  all: 'unset',
  display: 'inline-flex',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontWeight: 'bold',
  justifyContent: 'center',
  background: 'rgb(240, 240, 240)',
  flex: 1,
  padding: '1rem 0',

  '&:first-child': {
    borderTopLeftRadius: '0.5rem',
  },
  '&:last-child': {
    borderTopRightRadius: '0.5rem',
  },
  '&[data-state="active"]': {
    background: 'white',
    boxShadow: '0 1px 0 0 rgb(255, 255, 255)',
  }
});

export const TabsContent = styled(TabsPrimitives.Content, {
  background: 'white',
  borderRadius: '0 0 0.5rem 0.5rem',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 0,
});
