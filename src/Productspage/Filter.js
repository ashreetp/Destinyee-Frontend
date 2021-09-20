import React,{useState,useEffect} from 'react'
import './Filter.css'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Button} from '@material-ui/core'
import axios from './../axios.js'
import {useSelector,useDispatch} from 'react-redux'
import { selectRefresh_search,selectRefresh_products,setProducts,selectProducts,setRefresh_search,setRefresh_products,selectChanged_products,setChanged_products} from '../Redux/shopSlice';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        paddingBottom: 5,
        "@media only screen and (max-width: 600px)":{
            paddingBottom: 10,   
        }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    
  }));

function Filter({cur_url}) {
    const classes = useStyles();
    const [size, setSize] = useState('');
    const [design, setDesign] = useState('');
    const [fit, setFit] = useState('');
    const [sort, setSort] = useState('');
    
    const dispatch=useDispatch()
    const items = useSelector(selectProducts)
    const changed_items = useSelector(selectChanged_products)
    const refresh = useSelector(selectRefresh_products)
    const refresh_search = useSelector(selectRefresh_search)

    // const [products,setProducts] = useState(null);

    useEffect(() => {
		async function fetchPosts() {
			const response = await axios.get("/shop/products").then((res)=>{
            setProducts(res.data.data)
            })
            return response;
		}
		fetchPosts();
	}, []);

    const filter_items = () =>{
        let media = window.matchMedia("(max-width: 600px)")
        if(media.matches){
            document.querySelector('.Filter').style.display="none";
        }
        let final_items=[]
        
        items.map(dat=>{
            let sel_size='',sel_design='',sel_fit='';
            
            if(size=='S' && dat.size.S>0){
                sel_size="S"
            } else if(size=="M" && dat.size.M>0){
                sel_size="M"
            } else if(size=="L" && dat.size.L>0){
                sel_size="L"
            } else if(size=="XL" && dat.size.XL>0){
                sel_size="XL"
            } else if(size=="XXL" && dat.size.XXL>0){
                sel_size="XXL"
            } 

            if(design == dat.design){
                sel_design = design
            }

            if(fit == dat.fit){
                sel_fit = fit
            }

            if(sel_size!='' && design == '' && fit ==''){
                final_items.push(dat)
            } else if(sel_size!='' && sel_design != '' && fit ==''){
                final_items.push(dat)
            } else if(sel_size!='' && design == '' && sel_fit !=''){
                final_items.push(dat)
            } else if(sel_size!='' && sel_design != '' && sel_fit !=''){
                final_items.push(dat)
            }
            else if(size=='' && sel_design != '' && fit ==''){
                final_items.push(dat)
            } else if(size=='' && sel_design != '' && sel_fit !=''){
                final_items.push(dat)
            } 
            else if(size=='' && design == '' && sel_fit !=''){
                final_items.push(dat)
            }
            else if (size=='' && design == '' && fit==''){
                final_items.push(dat)
            }
        })
        if(sort === "Low to High"){
            final_items.sort(function(a, b) {
                if (a.price <= b.price) return -1;
                else return 1;
            });
        }
        else if(sort === "High to Low"){
            final_items.sort(function(a, b) {
                if (a.price >= b.price) return -1;
                else return 1;
            });
        }
        dispatch(setChanged_products(final_items))
        dispatch(setRefresh_search(Math.floor(Math.random() * 10)))
        // dispatch(setRefresh_products(Math.floor(Math.random() * 10)))
    }

    return (
        <div className="Filter">
            <FormControl className={classes.formControl}>
                <Select
                value={size}
                onChange={(e)=>setSize(e.target.value)}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'kOhO': 'Without label' }}
                >
                <MenuItem value="">
                    <strong>Size</strong>
                </MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <Select
                value={design}
                onChange={(e) => setDesign(e.target.value)}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="">
                    <strong>Design</strong>
                </MenuItem>
                <MenuItem value="Plain">Plain</MenuItem>
                <MenuItem value="Printed">Printed</MenuItem>
                <MenuItem value="Checked">Checked</MenuItem>
                <MenuItem value="Striped">Striped</MenuItem>
                </Select>
            </FormControl>



            <FormControl className={classes.formControl}>
                <Select
                value={fit}
                onChange={(e)=>{setFit(e.target.value)}}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="">
                    <strong>Fit</strong>
                </MenuItem>
                <MenuItem value="Slim">Slim</MenuItem>
                <MenuItem value="Regular">Regular</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <Select
                value={sort}
                onChange={(e)=>{setSort(e.target.value)}}
                displayEmpty
                className={classes.selectEmpty}
                >
                <MenuItem value="">
                    <strong>Sort By</strong>
                </MenuItem>
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Low to High">Low -> High</MenuItem>
                    <MenuItem value="High to Low">High -> Low</MenuItem>
                </Select>
            </FormControl>

            <Button onClick={filter_items} className="filter__btn" variant="contained" color="secondary">
                Load
            </Button>
        </div>
    )
}

export default Filter
