import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  Flex,
  Modal,
  Select,
  TextArea,
} from 'native-base';
import {useSelector} from 'react-redux';
import {INote, INotesState, IReducers} from '../../Models';

export type IData = Omit<INote, 'id'>;

interface INoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IData) => void;
}

const NoteForm: FunctionComponent<INoteFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const notes = useSelector((state: IReducers) => state.notes as INotesState);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [data, setData] = useState<IData>({
    note: '',
    categoryId: 0,
    clientId: 0,
  });

  const clear = () => {
    setData({
      note: '',
      categoryId: 0,
      clientId: 0,
    });
  };

  useEffect(() => {
    if (notes.selectedNote) {
      setData(notes.selectedNote);
      console.log(notes.selectedNote);
    } else {
      clear();
    }
  }, [notes.selectedNote]);
  const onChange = (key: keyof typeof data, value: string | number) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add/Update Note</Modal.Header>
        <Modal.Body>
          <Flex
            style={{
              gap: 2,
            }}>
            {/* ... */}
            <Select
              selectedValue={data.categoryId.toString()}
              minWidth="200"
              accessibilityLabel="Choose Category"
              placeholder="Choose Category"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => onChange('categoryId', itemValue)}>
              {notes.categories &&
                notes.categories.map((category, index) => (
                  <Select.Item
                    key={index}
                    label={category.name}
                    value={category.id.toString()}
                  />
                ))}
            </Select>
            <Select
              selectedValue={data.clientId.toString()}
              minWidth="200"
              accessibilityLabel="Choose Client"
              placeholder="Choose Client"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => onChange('clientId', itemValue)}>
              {notes.clients &&
                notes.clients.map((client, index) => (
                  <Select.Item
                    key={index}
                    label={client.name}
                    value={client.id.toString()}
                  />
                ))}
            </Select>
            <Box alignItems="center" w="100%">
              <TextArea
                autoCompleteType
                h={20}
                value={data.note}
                placeholder="Please write your note here"
                w="100%"
                onChangeText={value => {
                  onChange('note', value);
                }}
              />
            </Box>
          </Flex>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                clear();
                onClose();
              }}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                onSubmit(data);
                clear();
                onClose();
              }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default NoteForm;
