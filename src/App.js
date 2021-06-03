import { ButtonGroup ,Button, TextField} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {useState, useRef} from 'react';
import {stateToHTML} from 'draft-js-export-html'


import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderLineIcon from'@material-ui/icons/FormatUnderlined';
import SpaceBarIcon from '@material-ui/icons/SpaceBar'
import OrderListIcon from '@material-ui/icons/FormatListNumbered';
import UnorderListIcon from '@material-ui/icons/FormatListBulleted';
import SaveIcone from '@material-ui/icons/Save';
import ImgIcon from '@material-ui/icons/Image'

import classes from './App.module.css';



export default function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null); 
  const titleRef =useRef(null);
  const blogImg = useRef(null);

  const focus = function (){
    if (editorRef){
      editorRef.current.focus();
    }
  };


  const bold = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
   
    setEditorState (newState);
  }


  const italic = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
   
    setEditorState (newState);
  }

  const underline = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
   
    setEditorState (newState);
  }

  const code = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, "CODE");
   
    setEditorState (newState);
  }

  const h1 = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-one");
   
    setEditorState (newState);
  }

  // const h1 = (ev) => {
  //   ev.preventDefault();
  //   const newState = RichUtils.toggleBlockType(editorState, "header-one");
   
  //   setEditorState (newState);
  // }

  const h2 = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-two");
   
    setEditorState (newState);
  }
  const h3 = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-three");
   
    setEditorState (newState);
  }
  const h4 = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-four");
   
    setEditorState (newState);
  }
  const h5 = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-five");
   
    setEditorState (newState);
  }

  const h6 = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-six");
   
    setEditorState (newState);
  }
  const ul = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "unordered-list-item");
   
    setEditorState (newState);
  }

  const ol = function(ev){
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "ordered-list-item");
   
    setEditorState (newState);
  }


  //to use shortcuts like ctrl+B=Bold ,ctrl+I=Italic, ...etc
  const handleKeyCommand = (editorState, command) =>{
    const newState =RichUtils.handleKeyCommand(command, editorState);
    if (newState){
      setEditorState(newState)
    }
  }




  const submit = async (ev) =>{
    try{
    ev.preventDefault();
    const content = stateToHTML (editorState.getCurrentContent());
    const title = titleRef.current.value;
    const data = new FormData();
    data.append("title",title);
    data.append("content",content);
    data.append("image",blogImg.current.files[0]);


    const respons = await fetch(`http://${process.env.REACT_APP_DOMAIN}/api/blogs, {body:data, method:"POST",}`);
    const json = await respons.json();
    console.log(json);

  }catch (error){
    console.log(error);

  }}


  return (
    <>
    <AppBar position="static">

      <ToolBar >
      <Typography variant="h6">
        Fikra DashBoard
      </Typography>
      </ToolBar>
    </AppBar>
    <main className={classes.continer}>
      <div>
        <form className={classes.blogform} onSubmit={submit}>
          <TextField className={classes.blogTitle} inputRef={titleRef} label="Title" variant="outlined"/>
          <Button className={classes.uploadimg} type="button" color="primary" variant="contained" component="label">
            <input type="file" hidden ref={blogImg}/><ImgIcon/>
          </Button>
          <Button type="submit" color="primary" variant="contained"><SaveIcone/></Button>
        </form>
      <ButtonGroup className={classes.editorButtons} color="primary" variant="contained">
        <Button onMouseDown={h1}>H1</Button>
        <Button onMouseDown={h2}>H2</Button>
        <Button onMouseDown={h3}>H3</Button>
        <Button onMouseDown={h4}>H4</Button>
        <Button onMouseDown={h5}>H5</Button>
        <Button onMouseDown={h6}>H6</Button>
        <Button onMouseDown={bold}><FormatBoldIcon/></Button>
        <Button onMouseDown={italic}><FormatItalicIcon/></Button>
        <Button onMouseDown={underline}><FormatUnderLineIcon/></Button>
        <Button onMouseDown={code}><SpaceBarIcon/></Button>
        <Button onMouseDown={ol}><OrderListIcon/></Button>
        <Button onMouseDown={ul}><UnorderListIcon/></Button>
      </ButtonGroup>
      <div  className={classes.editor_continer} onClick={focus}>
      <Editor
      handleKeyCommand={handleKeyCommand}
      editorState={editorState}
      onChange={setEditorState} 
      ref={editorRef}>
        
      </Editor></div></div>
    </main>
    
    
    </>
  );
}