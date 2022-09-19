import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ActionType from '../ActionType'

export const addproductactiondata = (data) => async (dispatch) => {
  console.log(data);
  try {
    const rndnameimage = Math.floor(Math.random() * 10000000)
    const productimgfileupRef = ref(storage, 'ProductData/' + rndnameimage);
    uploadBytes(productimgfileupRef, data.file)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.ref))
          .then(async (url) => {
            const pizzadataRef = await addDoc(collection(db, "ProductData"), {
              Name: data.Name,
              Price: data.Price,
              file: url,
              category: data.category,
              fileName: rndnameimage
            });
            // console.log("Document written with ID: ", pizzadataRef.id);
            dispatch({
              type: ActionType.PIZZA_ADD_DATA,
              payload: {
                id: pizzadataRef.id,
                Name: data.Name,
                Price: data.Price,
                file: url,
                fileName: rndnameimage,
                category: data.category
              }
            })
          })
      });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getproductactiondata = () => async (dispatch) => {
  try {
    const pizzaSnapshot = await getDocs(collection(db, "ProductData"));

    const dataarr = []

    pizzaSnapshot.forEach((doc) => {
      dataarr.push({ id: doc.id, ...doc.data() })
    });
    dispatch({ type: ActionType.PIZZA_GET_DATA, payload: dataarr });

  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const deleteproductactiondata = (data) => async (dispatch) => {
  console.log(data)
  try {
    const deletepizzadataref = ref(storage, 'ProductData/' + data.fileName);
    deleteObject(deletepizzadataref)
      .then(async () => {
        await deleteDoc(doc(db, "ProductData", data.id));
        dispatch({ type: ActionType.PIZZA_DELETE_DATA, payload: data.id })
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const updateproductactiondata = (data) => async (dispatch) => {
  console.log(data);
  try {
    const PizzaupdateRef = doc(db, "ProductData/", data.id);
    if (typeof data.file === 'string') {
      await updateDoc(PizzaupdateRef, {
        Name: data.Name,
        Price: data.Price,
        category: data.category,
        filename:data.filename,
        file: data.file,
      });
      dispatch({ type: ActionType.PIZZA_UPDATE_DATA, payload: data })


    } else {

      const imagedelRef = ref(storage, 'ProductData/' + data.filename);
      deleteObject(imagedelRef)
        .then(async () => {
          const rndmfilename = Math.floor(Math.random() * 1000000).toString();
          const uploadRef = ref(storage, 'ProductData/' + rndmfilename);
          uploadBytes(uploadRef, data.file)
            .then((snapshot) => {
              // console.log(snapshot);
              getDownloadURL(ref(storage, snapshot.ref))
                .then(async (url) => {
                  console.log(url);
                  await updateDoc(PizzaupdateRef, {
                    Name: data.Name,
                    Price: data.Price,
                    file: url,
                    category: data.category,
                    fileName: rndmfilename,
                    file: url
                  });
                  dispatch({
                    type: ActionType.PIZZA_UPDATE_DATA,
                    payload: { ...data, fileName: rndmfilename, file: url }
                  })
                })
            })
        })
    }
    //   const PatientRef = doc(db, "Patient", data.id);

    //   // Set the "capital" field of the city 'DC'
    //   await updateDoc(PatientRef, {
    //     name: data.name,
    //     email: data.email,
    //     age: data.age,
    //     phonenumber: data.phonenumber
    //   });
    //   dispatch({ type: Actiontype.UPDATE_PATIENT, payload: data })
  }
  catch (e) {
    console.error("Error adding document: ", e)
  }
}

export const alldatafilterforcategory = (data) => (dispatch) =>{
  dispatch({type:ActionType.ALL_DATA_FILTER,payload:data})
}