import DeleteButton from '../DeleteButton/DeleteButton';
import { DeleteButtonPropsInterface } from '../DeleteButton/interfaces/delete-button-props.interface';
import PlusButton from '../PlusButton/PlusButton';
import StarButton from '../StarButton/StarButton';

const ActionButtons = (props: DeleteButtonPropsInterface) => {
  return (
    <>
      <PlusButton />
      <StarButton />
      <DeleteButton id={props.id} onDelete={props.onDelete} />
    </>
  );
};

export default ActionButtons;
