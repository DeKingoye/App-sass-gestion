import { Invoice } from '@/type'
import { Sql } from '@prisma/client/runtime/library';
import { CheckCircle, Clock, FileText, SquareArrowOutUpRight, XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'



type InvoiceComponentProps = {
    invoice: Invoice; 
    index: number
} 

const getStatusBadge = (status: number) => {
    switch(status){
        case 1: 
            return(
                <div className='badge badge-lg flex items-center gap-2'>
                    <FileText className='w-4'/>
                    Brouillon
                </div>
            )
        
        case 2: 
        return(
            <div className='badge badge-lg badge-warning flex items-center gap-2'>
                <Clock className='w-4'/>
                En attente
            </div>
        )

        case 3: 
        return(
            <div className='badge badge-lg badge-success flex items-center gap-2'>
                <CheckCircle className='w-4'/>
                payé
            </div>
        )

        case 4: 
        return(
            <div className='badge badge-lg badge-info flex items-center gap-2'>
                <XCircle className='w-4'/>
                Annulé
            </div>
        )

        case 5: 
        return(
            <div className='badge badge-lg badge-error flex items-center gap-2'>
                <XCircle className='w-4'/>
                impayé
            </div>
        )

        default: 
            return(
                <div className='badge badge-lg'>
                    <XCircle className='w-4'/>
                    Indefinis
                </div>
            )
    }
}

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({invoice,index}) => {
  return (
    <div className='bg-base-200/90 p-5 rounded-xl space-y-2 shadow'>
        <div className='flex justify-between items-center w-full'>
            <div>{getStatusBadge(invoice.status)}</div>
            <Link 
                className='btn btn-accent btn-sm'
                href={`/invoice/${invoice.id}`}>
                Plus
                <SquareArrowOutUpRight className='w-4'/>
            </Link>
        </div>
        <div>

        </div>
    </div>
  )
}

export default InvoiceComponent