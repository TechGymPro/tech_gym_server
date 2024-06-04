import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import fs from "fs";
const storage = getStorage();
const storageRef = ref(storage, 'images/save');
// Raw string is the default if no format is provided
const message = 'This is my message.';
uploadString(storageRef, message).then((snapshot) => {
  console.log('Uploaded a raw string!');
});

// Base64 formatted string

const sendBase64 = async(file)=>{
  const metadata = {
    contentType: 'image/jpeg',

  };
  const img = await fs.readFile("uploads/qr-code-iN.png", (err, data) =>data)
  console.log(img)
  const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
  await uploadString(storageRef, message2, 'base64').then((snapshot) => {
    
    console.log("MAKNKAN")
  });
 
  const no = false
  file&& await uploadBytes(storageRef, bytes,metadata).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

// Base64url formatted string
const message3 = '5b6p5Y-344GX44G-44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uploadString(storageRef, message3, 'base64url').then((snapshot) => {
  console.log('Uploaded a base64url string!');
});

// Data URL string
const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
uploadString(storageRef, message4, 'data_url').then((snapshot) => {
  console.log('Uploaded a data_url string!');
});
export { sendBase64 };

