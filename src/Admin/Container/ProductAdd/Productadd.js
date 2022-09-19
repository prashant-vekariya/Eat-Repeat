import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { addproductactiondata, deleteproductactiondata, getproductactiondata, updateproductactiondata } from '../../../Redux/Action/addProduct.action';
import { getcategoryactiondata } from '../../../Redux/Action/addcategory.action';

function Productadd(props) {
    const [open, setOpen] = useState(false);
    const [did, setDid] = useState()
    const [dopen, setDopen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [filename, setFilename] = useState();
    const [uid, setUid] = useState();

    const product = useSelector(state => state.product);
    const productdata = product.product
    console.log(productdata);

    const category = useSelector(state => state.categories)
    const catoption =category.category;
    console.log(catoption)
    // console.log(catoption.category)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickDopen = (params) => {
        setDopen(true);
        setDid(params.row)

    };


    const handleClose = () => {
        setOpen(false);
        setDopen(false);
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getproductactiondata());
        dispatch(getcategoryactiondata());
    }, [])


    const handleinsert = (data) => {
        console.log(data)
        const product = {
            Name: data.Name,
            Price: data.Price,
            file: data.file,
            category: data.category
        }
        dispatch(addproductactiondata(product));
        handleClose();
    }

    const handledelete = () => {
        // console.log(did);
        dispatch(deleteproductactiondata(did));
        handleClose();
    }

    const handleedit = (params) => {
        // console.log(params.row);
        formik.setValues({
            Name: params.row.Name,
            Price: params.row.Price,
            category: params.row.category,
            file: params.row.file
        })
        setUid(params.row.id)
        setFilename(params.row.fileName)
        setOpen(true);
        setUpdate(true)
    };

    const handleupdate = (data) => {
        const udata = {
            ...data,
            id: uid,
            filename: filename
        }
        formik.resetForm();
        setOpen(false);
        dispatch(updateproductactiondata(udata))
        console.log(udata);
    }

    let schema = yup.object().shape({
        Name: yup.string().required("Name is reqired"),
        Price: yup.number("Please Enter a digit").required("Price is reqired"),
        file: yup.mixed().required("Please enter a file"),
        category: yup.string().required('please select category'),
    });

    const formik = useFormik({
        initialValues: {
            Name: '',
            Price: '',
            file: '',
            category: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (update) {
                // console.log(values)
                handleupdate(values)
            } else {
                // console.log(values)
                handleinsert(values)
            }
        }
    });




    const { handleSubmit, errors, handleChange, values } = formik;
    console.log(errors);

    const columns = [
        { field: 'Name', headerName: 'Product Name', width: 120 },
        { field: 'Price', headerName: 'Product Price', type: 'number', width: 120 },
        { field: 'category', headerName: 'Product Category', width: 130 },
        { field: 'fileName', headerName: 'ImageName', width: 130 },
        {
            field: 'file', headerName: 'ProductImage', width: 110,
            renderCell: (params) => (
                <img src={params.row.file} width={80} alt />
            )
        },
        {
            field: 'delete',
            HeaderName: 'Delete/Update',
            width: 90,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleClickDopen(params)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="update" onClick={() => handleedit(params)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        },

    ];
    return (
        <>
            <section className='relative'>
                <div className='otherslider flex items-end '>
                    <div className='container flex justify-center'>
                        <h1 className='text-white text-4xl font-bold'>Admin Add</h1>
                    </div>
                </div>
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        AddProduct
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Product</DialogTitle>
                        <Formik value={formik}>
                            <Form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        variant="standard"
                                        type="Name"
                                        id="Name"
                                        value={values.Name}
                                        label="Pizza Name"
                                        onChange={handleChange} />
                                    {
                                        errors.Name ? <p>{errors.Name}</p> : null
                                    }
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        variant="standard"
                                        type="number"
                                        id="Price"
                                        label="Pizza Price"
                                        onChange={handleChange}
                                        value={values.Price} />
                                    {
                                        errors.Price ? <p>{errors.Price}</p> : null
                                    }
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            margin="dense"
                                            value={values.category}
                                            label="Category"
                                            onChange={handleChange}
                                            id="category"
                                            name="category"
                                        >
                                            {
                                                catoption.map((c)=>(
                                                    <MenuItem value={c.category}>{c.category}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        {
                                            errors.category ? <p>{errors.category}</p> : null
                                        }
                                    </FormControl>
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        variant="standard"
                                        id="file"
                                        type="file"
                                        onChange={(e) => formik.setFieldValue('file', e.target.files[0])} />
                                    {
                                        errors.file ? <p>{errors.file}</p> : null
                                    }
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type='Submit'>Add</Button>
                                </DialogActions>
                            </Form>
                        </Formik>
                    </Dialog>
                </div>
            </section>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={productdata}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <div>
                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handledelete} autoFocus>
                            Yes
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </>
    );
}

export default Productadd; 