import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {INote, INotesState, IReducers} from '../../Models';
import {
  addNewNote,
  clearSelectedNote,
  deleteExistingNote,
  getCategories,
  getClients,
  setSelectedNote,
  updateExistingNote,
} from '../../Redux';
import {Button, Flex, Heading, Stack, useDisclose} from 'native-base';
import NoteForm, {IData} from './NoteForm';

const App = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const dispatch = useDispatch();
  const notes = useSelector((state: IReducers) => state.notes as INotesState);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getClients());
  }, []);

  const addItem = (note: IData) => {
    if (notes.selectedNote) {
      dispatch(
        updateExistingNote({
          note: {
            ...notes.selectedNote,
            ...note,
          },
        }),
      );
    } else {
      dispatch(addNewNote({note}));
    }
  };

  const renderItem = ({item}: {item: INote}) => (
    <Flex style={styles.item}>
      <View>
        {notes.categories.length > 0 && (
          <Text>
            Category:{' '}
            {notes.categories.filter(c => c.id == item.categoryId)[0].name}
          </Text>
        )}
        {notes.clients.length > 0 && (
          <Text>
            Client: {notes.clients.filter(c => c.id == item.clientId)[0].name}
          </Text>
        )}
        <Text>{item.note}</Text>
      </View>
      <Stack
        mb="2.5"
        mt="1.5"
        direction={{
          base: 'row',
          md: 'row',
        }}
        space={2}
        mx={{
          base: 'auto',
          md: '0',
        }}>
        <Button
          size="sm"
          onPress={() => {
            dispatch(setSelectedNote({note: item}));
            onOpen();
          }}>
          Edit
        </Button>
        <Button
          size="sm"
          colorScheme="secondary"
          onPress={() => {
            Alert.alert(
              'Delete Confirmation',
              'Are you sure you want to delete this note?',
              [
                {
                  text: 'Yes',
                  onPress: () =>
                    dispatch(deleteExistingNote({noteId: item.id})),
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ],
            );
          }}>
          Delete
        </Button>
      </Stack>
    </Flex>
  );

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          onOpen();
          dispatch(clearSelectedNote());
        }}>
        Add New Item
      </Button>

      {notes.notes && notes.notes.length > 0 ? (
        <FlatList
          data={notes.notes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
        />
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Heading size={'md'}>Sorry, there are not notes to display</Heading>
        </Flex>
      )}

      <NoteForm isOpen={isOpen} onClose={onClose} onSubmit={addItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
