import {
   Box,
   Button,
   Flex,
   Image,
   Text,
} from '@chakra-ui/react';
import CreateEmployeeModal from '../modals/employee-modal';

 export default function EmptyUser() {
   return (
    <Flex display={"flex"} flexDirection={"column"}  justifyContent={"space-evenly"} mt="10">
      <Box bg="white" p="4" w="100%" h="411" display={"flex"} flexDirection={"column"}  justifyContent={"space-evenly"} mt="10" alignItems="center" borderRadius='md'>
        <Image src='sad-face.svg' height="128px" width="128px"alt='sad-face'/>
        <Text size="16px" color="#ACB5BD">Nenhum usuário cadastrado. Crie um usuário para começar.</Text>
        <CreateEmployeeModal/>
      </Box>
    </Flex>
    
   );
 }