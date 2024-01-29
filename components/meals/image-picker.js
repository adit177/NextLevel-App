'use client';
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({label,name}){
    const [pickedImage,setpickedImage]= useState();
    const imageInput=useRef();
    function handlePickerClick(){
        imageInput.current.click();
    }
    function handleImagechanged(e){
        const file=e.target.files[0];
        if(!file){
            setPickedImage(null);
            return;
        }
        const fileReader=new FileReader();
        fileReader.onload=()=>{
            setpickedImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }
    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="The image is selected by the user." fill />} 
            </div>
            <input className={classes.input} type="file" id="image" accept="image/png , image/jpeg, image/jpg" name={name} ref={imageInput} onChange={handleImagechanged} required/>
            <button className={classes.button} type="button" onClick={handlePickerClick}>
                Pick one Image
            </button>
        </div>
    </div>
}