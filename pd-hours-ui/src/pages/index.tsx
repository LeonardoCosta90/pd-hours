import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import EmptySquad from '../components/empty-squad';
import { Header } from '../components/Header';
import CreateSquadModal from '../components/modals/squad-modal';
import TabNav from '../components/tab-nav';
import { api } from '../services/api/api';

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
export default function Home({data}: HomeProps) { 
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
    <Box >
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
      {squad.length < 0 ? (
        <>
          <Text fontSize={"38px"} fontWeight={"500"}>Lista de Squads</Text>
          <Box bg="white" p="4" mt="10">      
            <Table width='750px' mt="5" mb="5">
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
                <Link href={`/squads/${item.id}`}>
                  <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      bg='#4263EB'
                      color="white"
                    >
                    Visualizar Squad
                    </Button>
                  </Link>                  
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
      </Flex>
    </Box>

  );

}

