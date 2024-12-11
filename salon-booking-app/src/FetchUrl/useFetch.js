import React, { useState, useEffect } from 'react';
import {authAction} from '../store/authenticationSlice'
import {servicesAction} from '../store/servicesSlice'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
const useFetch = (fetchData) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(null);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    console.log(fetchData)
    
    const url=fetchData.url
    const method=fetchData.method
    const headers=fetchData.headers
    const body=fetchData.body
    const action=fetchData.action

    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(10);
            setError(null); 
        console.log(url)
            try {
                const options = {
                    method,
                    headers,
                };

                if (body && method !== 'GET') {
                    options.body = JSON.stringify(body); 
                }

                const response = await fetch(url, options);
                setLoading(50)
               console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                setLoading(100)
                console.log(result)
                if(result && result.message)
                {
                    console.log(action)
                    if(action && action==='LOGIN')
                     {
                            
                           dispatch(authAction.login(result))
                           if(result.role==='admin')
                            navigate('/admin/salon-booking/home')
                           else
                              navigate('/salon-booking/userhome')
                        //   window.location.reload()  
                     } 
                     if(action && action==='GET_PROFILE')
                        dispatch(authAction.setProfile(result.message))
                     if(action && action==='GET_All_SERVICES')
                        dispatch(servicesAction.getServices(result.message))
                     if(action && action==='ADD_SERVICE')
                        dispatch(servicesAction.addService(result.services))
                     if(action && action==='GET_All_STAFS')
                        dispatch(servicesAction.getStaffs(result.message))
                     if(action && action==='ADD_STAF')
                        dispatch(servicesAction.addStaf(result.staf))
                     if(action && action==='GET_NOTIFICATIONS')
                        dispatch(servicesAction.getNotifications(result.message))
                     if(action && action==='GET_FEEDBACKS')
                        dispatch(servicesAction.getFeedbacks(result.message))

                        setMessage(result.message) 
                        setData(result); 
                }
                else if(result && result.error ){
                    setError(result.error)
                }
                
                

               
            } catch (err) {
                console.log(err)
                setError(err.message);
                
            } finally {
                setLoading(null);
            }
        };

        if (url) {
            fetchData(); 
        }
    }, method==='GET'?[url]:[url, method, headers, body]); 
    return {data,message,error,loading}

}

export default useFetch;
