import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import EmptyUser from '../../components/empty-user';
import { Header } from '../../components/Header';
import CreateEmployeeModal from '../../components/modals/employee-modal';
import TabNav from '../../components/tab-nav';
import { api } from '../../services/api/api';

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
  <Box>
  <title>PD Hours</title>
  <Header/>
  <Flex
    width="70%"
    maxWidth={"100%"}
    px={"160px"}    
    mt="-10"
    >
    <TabNav/>
    <Flex ml="-160" display={"flex"} flexDirection={"column"}  justifyContent={"space-between"} mt="20">
    {squad.length > 0 ? (
      <>
        <Text fontSize={"38px"} fontWeight={"500"}>Lista de Usuários</Text>
        <Box bg="white" p="4" mt="10">      
          <Table width='750px' mt="5" >
            <Thead>
              <Tr >
                <Th background={"#4263EB"} color="white" fontSize="16px" >ID</Th>
                <Th background={"#4263EB"} color="white" fontSize="16px">Nome</Th>
                <Th background={"#4263EB"} color="white" fontSize="16px">Squad ID</Th>
              </Tr>
            </Thead>       
            <Tbody>
            {squad.map(item => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>            
              <Td>{item.name}</Td>
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
    </Flex>
  </Box>

);

}