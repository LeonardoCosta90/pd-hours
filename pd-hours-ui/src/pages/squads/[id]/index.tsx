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
} from "@chakra-ui/react";
import { Header } from "../../../components/Header";
import { useRouter } from "next/router";
import TabNav from "../../../components/tab-nav";
import { useEffect, useState } from "react";
import EmptySquadUser from "../../../components/empty-squad-user";
import moment from "moment";
import { api } from "../../../services/api/api";

type Squads = {
  id: number;
  name: string;
};

type HomeProps = {
 data: Squads[];
 squadName: string;
 totalItems: number;
 totalItemsPerPage: number;
 page: number;
 totalPages: number;
}

const INITIAL_VALUE: HomeProps = {
  "data": [],
  "squadName": '',
  "totalItems": 0,
  "totalItemsPerPage": 0,
  "page": 0,
  "totalPages": 1
}

type Report = {
  id: number;
  description: string;
  spent_hours: string;
  estimated_hours: string;
  created_at: string;
  employee: {
    name: string;
  }
};

interface ReportProps{
 data: Report[];
 totalHours: string;
 averageHours: string;
 totalItems: number;
 totalItemsPerPage: number;
 page: number;
 totalPages: number;
}

const INITIAL_VALUE_REPORT: ReportProps = {
  "data": [],
  "totalHours": "0",
  "averageHours": "0",
  "totalItems": 0,
  "totalItemsPerPage": 0,
  "page": 0,
  "totalPages": 1
}

export default function SquadsDetails() {
  const [employee, setEmployee] = useState(INITIAL_VALUE);
  const [report, setReport] = useState(INITIAL_VALUE_REPORT);
  const router = useRouter();
  const {id} = router.query

  useEffect(() => {
    const getData = async () => {
        try {
            const employees = await api.get(`/employees/${Number(id)}`)
            const reports = await api.get(`/reports/${Number(id)}`)
            setEmployee(employees.data)
            setReport(reports.data) 
        } catch (err) {
            console.log(err)
            alert('Ocorreu um erro!')
        }
    }
    getData();
 }, [id]) 

  return (
    <Box>
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
    <Text fontSize={"38px"} fontWeight={"500"} mt="10">{employee?.squadName}</Text>
    {employee.totalItems > 0 ?  (
      <Flex display={"flex"} flexDirection={"column"}  justifyContent={"space-between"} >
        <Box bg="white" p="4" w="150%" h="450" display={"flex"} flexDirection={"column"}  justifyContent={"space-evenly"} mt="10" alignItems="center" borderRadius='md'>
        <Text fontSize={"28px"} fontWeight={"400"} mt="10">Horas por membro</Text>
        <Box bg="white" p="4" >      
          <Table width='750px' mt="5" >
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