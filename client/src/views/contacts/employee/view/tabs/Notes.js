import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';
import NotesView from './NotesView';

function Notes() {
  return (
    <Card className='p-1'>
      <NotesView />
    </Card>
  );
}
export default Notes;
