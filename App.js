import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContainersListScreen from './screens/ContainersListScreen';
import ContainerInfoScreen from './screens/ContainerInfoScreen';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='ContainersList' component={ContainersListScreen} />
                    <Stack.Screen name='ContainerInfo' component={ContainerInfoScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}