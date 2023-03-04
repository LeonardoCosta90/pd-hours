import { Box,  List, ListItem} from '@chakra-ui/react';
import CreateReportModal from '../modals/create-report-modal';
import { Logo } from './Logo';
import { Title } from './Title';



export function Header() {

  return ( 
    <Box  width='100%' bg='#FFF'  h={"150"} px={"160px"}>
    <Logo ></Logo>
    <List display={"flex"} justifyContent="space-between">
    <Title/>
      <ListItem>
        <CreateReportModal/>
      </ListItem>
    </List>
  </Box>
)
}
