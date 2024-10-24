import { useRef, useState } from "react"
import AddButton from "../component/addButton"
import { IoIosClose } from "react-icons/io";



const options = ['India','Australia','America','South Africa ','Pakistan','Bangledash','Srilanka']



function InvoiceForm(){

    const [upadte,setUpdate] = useState(0)

    const  ref = useRef()

    const initialState={
        invoiceNo:"",
        imgSrc:'',
        invoiceDate:'',
        showDueDate:false,
        dueDate:'',
        customField:[],
        billToCustomField:[],
        billByCustomField:[],
        items:[{
          itemName:'',
          hsn:'',
          quantity:'',
          rate:'',
          amount:'',
          total:'',
          gst:''
        }],
        dueDate:'',
        billedBy:{
            country:'',
            bussinessName:"",
            gstinNo:'',
            address:'',
            city:'',
            postCode:'',
            state:'',
        },
        billedTo:{
            country:'',
            bussinessName:"",
            gstinNo:'',
            address:'',
            city:'',
            postCode:'',
            state:'',
        },
    }

    const handleCustomField =(index,key,subKey,val)=>{


        let arr= state[key]

        arr[index][subKey]=val

         setState(prev=>({
             ...prev,
             [key]:arr
         }))

    }

    const [state,setState] = useState(initialState)

    const [billToCustomField,setCustomFieldTo] = useState([])

    const [billByCustomField,setBillByCustomField] = useState([])

    const handleChange=(section,field,val)=>{

        console.log(section,field,val);

          if(section.length>0){

            setState(prev=>({
                ...prev,
                [section]:{
                    ...prev[section],
                    [field]:val
                }
            }))

          }else{

              setState(prev=>({
                ...prev,
                [field]:val
              }))

          }

    }

    const handleCustomRemoveField=(index,key)=>{
        

        let filt = state[key].filter((_,indx)=>index!=indx)

         handleChange('',key,filt)

         setUpdate(upadte+1)

    }

    const handleUpload=()=>ref.current.click()

    return(
      <>
      <input type="file" style={{display:'none'}}
      ref={ref}
      onChange={(e)=>handleChange('','imgSrc',e.target.files[0])}
      accept="image/*"
      />
        <div className="container mt-5 backgroundWhite rounded mb-4 " style={{width:'70%'}} >
            <div className="p-4 ">
               <div>
                <h1 className="fw-bold text-center ">Invoice</h1>
               </div>
               <div>
                <form>
                    <div className="d-flex justify-content-between">
                        <div className="w-50">
                             <div className="mb-3 d-flex align-items-center just ">
                                <label for="exampleInputEmail1" className="form-label mt-3 w-100">Invoice No <span className="text-danger">*</span></label>
                               <div className="ml-3 w-100">
                                  <input type="text" className="form-control field "
                                  value={state.invoiceNo}
                                  onChange={(e)=>{handleChange('','invoiceNo',e.target.value)}}
                                  /> 
                                </div>
                             </div>
                             <div className="mb-3 d-flex align-items-center  ">
                                <label for="exampleInputEmail1" className="form-label mt-3 w-100">Invoice Date <span className="text-danger">*</span></label>
                               <div className="ml-3 w-100">
                                  <input type="date" className="form-control field " 
                                  value={state.invoiceDate}
                                  onChange={(e)=>{handleChange('','invoiceDate',e.target.value)}}/> 
                                </div>
                             </div>
                             {
                                state.showDueDate&&

                             <div className="mb-3 d-flex align-items-center  ">
                             <label for="exampleInputEmail1" className="form-label mt-3 w-100">Due Date <span className="text-danger">*</span></label>
                            <div className="ml-3 w-100 d-flex" >
                               <input type="date" className="form-control field " 
                               value={state.dueDate}
                               onChange={(e)=>{handleChange('','dueDate',e.target.value)}}/> 
                               <IoIosClose size={40} cursor={'pointer'} 
                               onClick={()=>{handleChange('','showDueDate',false)}}
                               />
                             </div>
                          </div>
                             }
                             {
                                !state.showDueDate&&
                                <div>
                                   <AddButton title={'Add Due Date'} hadleFunc={()=>{
                                       handleChange('','showDueDate',true)
                                   }}/>
                                </div>
                             }
                             {
                                state.customField.map((i,index)=>{

                                    return <div className="d-flex gap-2 mt-2" key={index}>
                                  <input type="text" className="form-control field "
                                  value={state[i.fieldName]}
                                  placeholder="Field Name"
                                  onChange={(e)=>handleCustomField(index,'customField','fieldName',e.target.value)}
                                  /> 
                                   <input type="text" className="form-control field "
                                  value={state[i.FieldValue]}

                                  placeholder="Field Value"
                                  onChange={(e)=>handleCustomField(index,'customField','FieldValue',e.target.value)}
                                  /> 
                                  <div className="mt-2" >
                                  <IoIosClose size={40} cursor={'pointer'}
                                  onClick={()=>handleCustomRemoveField(index,'customField')}
                                  />
                                  </div> 
                                  </div>

                                })
                             }
                             <div className="mt-2">
                                <AddButton title={'Add More Fields'} 
                                hadleFunc={()=>{

                                    handleChange('','customField',[...state.customField,{
                                        fieldName:"",
                                        FieldValue:''
                                    }])

                                }}
                                />
                             </div>
                        </div>
                        <div>
                            <div className="bussinessLogo">
                              {
                                state.imgSrc!=""?
                                <div className="d-flex justify-content-center">
                                <img src={URL.createObjectURL(state.imgSrc)} alt=""
                                className="img"
                                />
                                </div>:<div  onClick={handleUpload}>
                                <h6 className="text-center">Add Bussiness Logo</h6>
                            <div className="text-center">
                                Resolution Upto 1080x1080px,<br />
                                PNG or JPG file
                            </div>
                                </div>
                              }
                            
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-arround gap-2 mt-3  ">
                        <div className="w-100 backgound p-4 rounded">
                          <h5>Billed By <span className="smallFont">(Your Details)</span></h5>
                          <div>
                             <select className="form-select field transparentBg " style={{marginTop:"10px"}} aria-label="Default select example"
                             value={state.billedBy.country}
                             onChange={(e)=>handleChange('billedBy','country',e.target.value)}
                             >
                               {
                                options.map((i)=>{
                                    return <option key={i} value={i}>{i}</option>
                                })
                               }
                             </select>
                          </div>
                          <div className="mb-3 d-flex align-items-center just ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="Your Bussiness Name (Required)"
                              value={state.billedBy.bussinessName}
                             onChange={(e)=>handleChange('billedBy','bussinessName',e.target.value)}
                              /> 
                          </div>
                          <div className="d-flex align-items-center">
                          <div class="dropdown">
                              <button class="dropdown-toggle transparentBg countrtdrop pb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 <img src="https://images.pexels.com/photos/28958101/pexels-photo-28958101/free-photo-of-scenic-view-of-lake-powell-at-sunset.jpeg" className="flag" alt="" />
                              </button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                 <a class="dropdown-item" href="#">Action</a>
                                 <a class="dropdown-item" href="#">Another action</a>
                                 <a class="dropdown-item" href="#">Something else here</a>
                               </div>
                           </div>
                           <div className="w-100">
                             <input type="text" className="form-control field transparentBg "
                              placeholder="Your Number"/> 
                          </div>
                          </div>
                          <div className="mb-3 d-flex align-items-center just ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="Your GSTIN (optional)"                             
                             value={state.billedBy.gstinNo}
                             onChange={(e)=>handleChange('billedBy','gstinNo',e.target.value)}
                              /> 
                          </div>
                          <div className="mb-3 d-flex align-items-center just ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="Address (optional)"                             
                              value={state.billedBy.address}
                              onChange={(e)=>handleChange('billedBy','address',e.target.value)}
                              
                              /> 
                          </div>
                          <div className="d-flex justify-content-between gap-2">
                          <div className="mb-3 d-flex align-items-center w-100 ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="City (optional)"                                                          
                              value={state.billedBy.city}
                              onChange={(e)=>handleChange('billedBy','city',e.target.value)}
                              /> 
                          </div>
                          <div className="mb-3 d-flex align-items-center w-100 ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="Post Code / Zip Code"                                                           
                              value={state.billedBy.postCode}
                              onChange={(e)=>handleChange('billedBy','postCode',e.target.value)}
                              /> 
                          </div>
                          </div>
                          <div>
                             <select className="form-select field transparentBg "
                                                                                       
                              value={state.billedBy.state}
                              onChange={(e)=>handleChange('billedBy','state',e.target.value)}
                             >
                                <option value="" disabled selected>State (optional)</option>
                               {
                                options.map((i)=>{
                                    return <option key={i} value={i}>{i}</option>
                                })
                               }
                             </select>
                          </div>

                          <div>
                            {
                                state.billToCustomField.map((i,index)=>{
                                    return <input type="text" name="" id="" key={index}/>
                                })
                            }
                          </div>

                          <div className="mt-4">
                            <AddButton title={'Add Custom Field'}
                            
                            />
                          </div>
                        </div>
                        <div className="backgound p-4 w-100 rounded">
                          <h5>Billed To <span className="smallFont">(Your Details)</span></h5>
                          <div>
                             <select className="form-select field transparentBg "
                             value={state.billedTo.country}
                             onChange={(e)=>handleChange('billedTo','country',e.target.value)}
                             >
                               {
                                options.map((i)=>{
                                    return <option key={i} value={i}>{i}</option>
                                })
                               }
                             </select>
                          </div>
                          <div className="mb-3 d-flex align-items-center just ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="Your Bussiness Name (Required)"
                              value={state.billedTo.bussinessName}
                              onChange={(e)=>handleChange('billedTo','bussinessName',e.target.value)}
                              
                              /> 
                          </div>

                          <div className="d-flex align-items-center">
                          <div class="dropdown">
                              <button class="dropdown-toggle transparentBg countrtdrop pb-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 <img src="https://images.pexels.com/photos/28958101/pexels-photo-28958101/free-photo-of-scenic-view-of-lake-powell-at-sunset.jpeg" className="flag" alt="" />
                              </button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                 <a class="dropdown-item" href="#">Action</a>
                                 <a class="dropdown-item" href="#">Another action</a>
                                 <a class="dropdown-item" href="#">Something else here</a>
                               </div>
                           </div>
                           <div className="w-100">
                             <input type="text" className="form-control field transparentBg "
                              placeholder="Your Number"
                              id="exampleInputEmail1" aria-describedby="emailHelp"/> 
                          </div>
                            <div>

                            </div>
                          </div>
                          <div className="mb-3 d-flex align-items-center just ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="Your GSTIN (optional)"
                              value={state.billedTo.gstinNo}
                              onChange={(e)=>handleChange('billedTo','gstinNo',e.target.value)}
                              
                              /> 
                          </div>
                          <div className="mb-3 d-flex align-items-center just ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="Address (optional)"
                              value={state.billedTo.address}
                              onChange={(e)=>handleChange('billedTo','address',e.target.value)}
                              
                              /> 
                          </div>
                          <div className="d-flex justify-content-between gap-2">
                          <div className="mb-3 d-flex align-items-center w-100 ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="City (optional)"
                              value={state.billedTo.city}
                              onChange={(e)=>handleChange('billedTo','city',e.target.value)}
                              
                              /> 
                          </div>
                          <div className="mb-3 d-flex align-items-center w-100 ">
                             <input type="text" className="form-control field transparentBg mt-2"
                              placeholder="Post Code / Zip Code"
                              value={state.billedTo.postCode}
                              onChange={(e)=>handleChange('billedTo','postCode',e.target.value)}/> 
                          </div>
                          </div>
                          <div>
                             <select className="form-select field transparentBg " 
                              value={state.billedTo.city}
                              onChange={(e)=>handleChange('billedTo','city',e.target.value)}
                             
                             >
                                <option value="" disabled selected>State (optional)</option>
                               {
                                options.map((i)=>{
                                    return <option key={i} value={i}>{i}</option>
                                })
                               }
                             </select>
                          </div>
                          <div>
                            {
                                state.billByCustomField.map((i,index)=>{
                                    return <div>
                                    
                                    <input type="text" className="form-control field-box transparentBg mt-2" name="" id="" key={index}/>
                                    </div>
                                    
                                })
                            }
                          </div>

                          <div className="mt-4">
                            <AddButton title={'Add Custom Field'}
                            
                            />
                          </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4 text-center gst">
                            <span className="color">%</span> Edit GST
                        </div>
                        <div className="col-md-4">
                            
                             <select className="form-select field transparentBg "                            
                             >
                               {
                                options.map((i)=>{
                                    return <option key={i} value={i}>{i}</option>
                                })
                               }
                             </select>
                          
                        </div>
                    </div>
                    <div className="row mt-4 bgColr">
                       <div className='col-md-3'>Item</div>
                       <div className='col-md-1'>HSN/SAC</div>
                       <div className='col-md-1'>GST</div>
                       <div className='col-md-1'>Quantity</div>
                       <div className='col-md-1'>Rate</div>
                       <div className='col-md-2'>Amount</div>
                       <div className='col-md-2'>Total</div>
                    </div>
                    {
                      state.items.map((item,index)=>{
                        return <div className="backgound mb-2" key={index}>
                        <div className="row p-4 ">
                        <div className='col-md-3'>
                          <input type="text" className="form-control field transparentBg mt-1"
                          value={item.itemName}
                          onChange={(e)=>{
                            handleCustomField(index,'items','itemName',e.target.value)
                          }}
                          /> 
                        </div>
                        <div className='col-md-1'>
                          <input type="number" className="form-control field transparentBg mt-1"
                          value={item.hsn}
                          onChange={(e)=>{
                            handleCustomField(index,'items','hsn',e.target.value)
                          }}
                          /> 
    
                        </div>
                        <div className='col-md-1'>
                          <input type="number" className="form-control field transparentBg mt-1"
                          value={item.gst}
                          onChange={(e)=>{
                            handleCustomField(index,'items','gst',e.target.value)
                          }}
                          /> 
                        </div>
                        <div className='col-md-1'>
                          <input type="number" className="form-control field transparentBg mt-1"
                          value={item.quantity}
                          onChange={(e)=>{
                            handleCustomField(index,'items','quantity',e.target.value)
                          }}
                          /> 
    
                        </div>
                        <div className='col-md-1'>
                          <input type="number" className="form-control field transparentBg mt-1"
                          value={item.rate}
                          onChange={(e)=>{
                            handleCustomField(index,'items','rate',e.target.value)
                          }}
                          /> 
                          </div>
                        <div className='col-md-2'>
                          <input type="number" className="form-control field transparentBg mt-1"
                          disabled
                          value={Number(item.quantity)*Number(item.rate)}
                          
                          /> 
                          </div>
                        <div className='col-md-2'>
                          <input type="number" className="form-control field transparentBg mt-1"
                          disabled
                          value={(Number(item.quantity)*Number(item.rate))+Number(item.gst)+Number(item.hsn)}
                          /> 
                        </div>
                        <div className="col-md-1">
                           <IoIosClose size={25}
                           onClick={()=>{
                            handleCustomRemoveField(index,'items')
                           }}
                           />
                        </div>
                     </div>
                     </div>
                      })
                    
                    }
                    <div className="text-center borderDotted p-2" 
                    onClick={()=>{

                      handleChange('','items',[...state.items,{
                        itemName:'',
                        hsn:'',
                        quantity:'',
                        rate:'',
                        amount:'',
                        total:'',
                        gst:''
                      }])

                    }}
                    >
                        <span>+</span> Add New Line
                    </div>
                    <div className="d-flex justify-content-center mt-4" >
                      <button className="btn btn-danger" type="submit">Save & Continue</button>
                    </div>
                </form>
               </div>
            </div>
        </div>
        </>
    )


}

export default InvoiceForm