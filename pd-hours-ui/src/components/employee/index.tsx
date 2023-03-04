import {
  Box, Button, Divider,
  Flex,
  Heading, Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from '../../auth/hooks/useAuth';
import { Header } from '../Header';
import Pagination from '../Pagination';
import { Sidebar } from '../Sidebar';
import { api } from '../../services/api/api';
import moment from 'moment';
import Link from 'next/link';
import EmptyUser from '../empty-user';
import CreateEmployeeModal from '../modals/employee-modal';


type Employees = {
  id: number;
  name: string;
  estimated_hours: string;
  created_at: string;
  squad_id: number;
};

interface HomeProps{
 data: Employees[];
 totalItems: number;
 totalItemsPerPage: number;
 page: number;
 totalPages: number;
}

export default function Employees( {data}: HomeProps) {
 const [squad, setSquad] = useState(data || []);
 useEffect(() => {
   const getData = async () => {
       try {
           const response = await api.get(`/employees`)
           setSquad(response.data.data)

       } catch (err) {
           console.log(err)
           alert('Ocorreu um erro!')
       }
   }
   getData();
}, []) 

  return (
   <Flex display={"flex"} flexDirection={"column"}  justifyContent={"space-between"} mt="10">
     {squad.length > 0 ? (
        <>
          <Text fontSize={"38px"} fontWeight={"500"}>Lista de Usuários</Text>
          <Box bg="white" p="4" w="100%" h="411" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} mt="10">  
            <Table width='750px' mt="5">
            <Thead>
              <Tr>
                <Th background={"#4263EB"} color="white" fontSize="16px">Nome</Th>
                <Th background={"#4263EB"} color="white" fontSize="16px">Horas</Th>
                <Th background={"#4263EB"} color="white" fontSize="16px">Squad ID</Th>
              </Tr>
            </Thead>
            <Tbody>
              {squad.map(item => (
                <Tr key={item.id}>
                  <Td>
                    <Box>
                      <Text>{item.name}</Text>
                    </Box>
                  </Td>
                  <Td>{item.estimated_hours}</Td>
                  <Td>{item.squad_id}</Td>
                </Tr>
              ))}
            </Tbody>
            </Table>
            <CreateEmployeeModal/>
          </Box>  
        </>
      ): (
        <EmptyUser/>
      )}       
   </Flex>
  );
}