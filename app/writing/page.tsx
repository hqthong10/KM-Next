'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IResponse, sendRequest } from '@/libs/request';
import { Button, Input } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';
import client from '@/libs/apollo-client';

const GET_USERS = gql`
    query {
        s100_read { PS100, SV101, SV102, SN103, SV104 }
    }
`;

export default function SentencePage() {
    const [list, setLists] = useState([]);
    const [inpEn, setInpEn] = useState('');
    const [inpvi, setInpVi] = useState('');
    
    // const { loading, error, data } = useQuery(GET_USERS);
    // console.log(data)

    const fetchData = async () => {
        try {
            const response: IResponse = await sendRequest<IResponse>({
                url: '/api/writing',
                method: 'GET',
                data: { 
                    query: `{ s100_read { PS100, SV101, SV102, SN103, SV104 } }`
                },
            });

            console.log(response);

            setLists(response!.data!.s100_read || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataApollo = async () => {
        try {
            const response = await client.query({
                query: GET_USERS
            })

            console.log(response);

            setLists(response!.data!.s100_read || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            // fetchData();
            fetchDataApollo();
        }, 1000);
    }, []);

    const actionSave = async () => {
        const response: IResponse = await sendRequest<IResponse>({
            url: '/api/writing',
            method: 'POST',
            data: { 
                PS100: 0,
                SV101: inpEn.trim(),
                SV102: inpvi.trim()
            },
        });

        // const ADD_USERS = gql`
        //     mutation s100_create($PS100: Number, $SV101: String, $SV102: String) {
        //         s100_create(data: {
        //             PS100: $PS100,
        //             SV101: $SV101,
        //             SV102: $SV102,
        //         }){ PS100, SV101, SV102 }
        //     }
        // `;
        
        // const variables = {
        //     PS100: 0,
        //     SV101: inpEn.trim(),
        //     SV102: inpvi.trim()
        // };

        // const response = await client.query({
        //     query:ADD_USERS,
        //     variables: variables
        // });

        if (response!.data!.PS100 > 0) {
            setInpEn('');
            setInpVi('');
        }

    }

    return (
        <main className="flex min-h-screen flex-col p-4 bg-white">
            <p>Total: {list.length}</p>
            <div className='box-insert flex flex-col gap-2'>
                <Input value={inpEn} label="en" onChange={(e: any) => setInpEn(e.target.value)}></Input>
                <Input value={inpvi} label="vi" onChange={(e: any) => setInpVi(e.target.value)}></Input>
                <Button color="primary" onPress={actionSave}>Save</Button>
            </div>
        </main>
    );
}
