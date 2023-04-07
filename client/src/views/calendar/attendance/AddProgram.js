import React, {useState} from "react";
import {Label,Input} from 'reactstrap';
import ColorPicker from './ColorPicker';

function Form() {


  const [programTitle, setProgramTitle] = useState('');
 
  return (
     <form>
         <div className="mb-1">
                  <Label className="form-label" for="title">
                    Program Name 
                  </Label>
                  <Input
                    id="title"
                    value={programTitle}
                    placeholder="Program Name"
                    onChange={(event) => setProgramTitle(event.target.value)}
                  />
                </div>
                <div>
                  <ColorPicker/>
                </div>
     </form>
  );
}
export default Form;