import { Avatar, Button, Icon, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "redux/selectors";
import { FiLogOut } from "react-icons/fi";
import { useLogoutMutation } from "redux/rtkAPI/authApi";
import { useEffect } from "react";
import { defUser, setUserSlice } from "redux/userSlice";


export const UserMenu = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [logoutForm, { isSuccess }] = useLogoutMutation();

  const handleLogOut = () => logoutForm(token);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserSlice(defUser));
    }

  }, [dispatch, isSuccess]);

  return (
    <Stack direction={['column', 'row', 'row', 'row']} alignItems={'center'}>
      <Avatar size='sm' name={user.name} src='' />
      <Text>{user.name}</Text>
      <Button type='button' onClick={handleLogOut}><Icon as={FiLogOut} mr={'8px'} />Log Out</Button>
    </Stack>
  )
}

export default UserMenu;
