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
import CreateSquadModal from '../modals/squad-modal';
import EmptySquad from '../empty-squad';
import SquadDetails from './details';
import CreateReportModal from '../modals/create-report-modal'
 
 type Squads = {
   id: number;
   name: string;
 };

 interface HomeProps{
  data: Squads[];
  totalItems: number;
  totalItemsPerPage: number;
  page: number;
  totalPages: number;
}

 export default function Squads( {data}: HomeProps) {
  const [squad, setSquad] = useState(data || []);
  useEffect(() => {
    const getData = async () => {
        try {
            const response = await api.get(`/squads`)
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
          <Text fontSize={"38px"} fontWeight={"500"}>Lista de Squads</Text>
          <Box bg="white" p="4" w="100%" h="500" display={"flex"} flexDirection={"column"} justifyContent={"space-between"} mt="10">      
            <Table width='750px' mt="5" >
              <Thead>
                <Tr >
                  <Th background={"#4263EB"} color="white" fontSize="16px" >ID</Th>
                  <Th background={"#4263EB"} color="white" fontSize="16px">Nome</Th>
                  <Th background={"#4263EB"} color="white"></Th>
                </Tr>
              </Thead>       
              <Tbody>
              {squad.map(item => (
              <Tr key={item.id}>
                <Td>
                  <Text>{item.id}</Text>
                </Td>            
                <Td>{item.name}</Td>
                <Td>
                  <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      bg='#4263EB'
                      color="white"
                    >Visualizar Squad</Button>
                </Td>          
              </Tr>
            ))}
              </Tbody>            
            </Table>
            <CreateSquadModal/>
          </Box>
        </>
      ): (
        <EmptySquad/>
      )}      
    </Flex>
   );
 }