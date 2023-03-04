import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { useRouter } from "next/router";
import TabNav from "../../../components/tab-nav";
import { useEffect, useState } from "react";
import EmptySquadUser from "../../../components/empty-squad-user";
import moment from "moment";
import { api } from "../../../services/api/api";

type Report = {
  id: number;
  description: string;
  spent_hours: string;
  estimated_hours: string;
  created_at: string;
  employee: {
    name: string;
    squad: {
      name: string;
    }
  }
  
};

interface ReportProps{
 data: Report[];
 totalUsers: number;
 totalHours: number;
 averageHours: number;
 totalItems: number;
 totalItemsPerPage: number;
 page: number;
 totalPages: number;
}

const INITIAL_VALUE_REPORT: ReportProps = {
  "data": [],
  "totalUsers": 0,
  "totalHours": 0,
  "averageHours": 0,
  "totalItems": 0,
  "totalItemsPerPage": 0,
  "page": 0,
  "totalPages": 1
}

export default function SquadsDetails() {
  const [report, setReport] = useState(INITIAL_VALUE_REPORT);
  const router = useRouter();
  const {id} = router.query

  useEffect(() => {
    const getData = async () => {
        try {
            const reports = await api.get(`/reports/${Number(id)}`)
            setReport(reports.data) 
        } catch (err) {
            console.log(err)
        }
    }
    getData();
 }, [id]) 

  return (
    <Box>
    <title>PD Hours</title>
    <Header/>
    <Flex
      width="70%"
      maxWidth={"100%"}
      px={"160px"}    
      mt="-10"
      display={"flex"}
      flexDirection={"column"}
    >
    <TabNav/>
    <Text fontSize={"38px"} fontWeight={"500"} >{report.data[0]?.employee.squad.name}</Text>
    {report.totalUsers > 0 ?  (
      <Flex display={"flex"} flexDirection={"column"}  justifyContent={"space-between"} >
        <Box bg="white" p="4" w="150%" h="650" display={"flex"} flexDirection={"column"}  justifyContent={"space-evenly"} mt="5" alignItems="center" borderRadius='md'>
        <Text fontSize={"28px"} fontWeight={"400"}>Horas por membro</Text>
        <Stack direction='row' alignItems="center" >
          <Input type="date" w="190px"></Input>
          <Input type="date" w="190px"></Input>
          <Button type="submit" form="new-squad" background="#4263EB" color='white' mr={3}>
          Filtrar por data
          </Button>
        </Stack>
        <Box bg="white" px="4" >      
          <Table width='750px' mt="5">
            <Thead>
              <Tr >
                <Th background={"#4263EB"} color="white" fontSize="16px" >Membro</Th>
                <Th background={"#4263EB"} color="white" fontSize="16px">Descrição</Th>
                <Th background={"#4263EB"} color="white" fontSize="16px">Horas</Th>
                <Th background={"#4263EB"} color="white" fontSize="16px">Criado em</Th>
              </Tr>
            </Thead>       
            <Tbody>
            {report.data.map(item => (
            <Tr key={item.id}>
              <Td>{item?.employee.name}</Td>            
              <Td>{item?.description}</Td>
              <Td>{item?.spent_hours}</Td>
              <Td>{moment(item?.created_at).format('DD/MM/YYYY')}</Td>       
            </Tr>
          ))}
            </Tbody>            
          </Table>
        </Box>
        <Text fontSize={"28px"} fontWeight={"400"}>Horas totais da squad</Text>
        <Text fontSize={"50px"} fontWeight={"500"} color={"#4263EB"}>{report?.totalHours} Horas</Text>
        <Text fontSize={"28px"} fontWeight={"400"} >Média de horas por dia</Text>
        <Text fontSize={"50px"} fontWeight={"500"} color={"#4263EB"}>{report?.averageHours}/Dia</Text>
        </Box>
    </Flex>
    ): (
      <EmptySquadUser/>
    )}
    </Flex>
  </Box>
  )
}