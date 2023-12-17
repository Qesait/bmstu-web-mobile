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
                <Stack.Navigator screenOptions={{
                    contentStyle: {
                        backgroundColor: '#FFFFFF'
                    }
                }}>
                    <Stack.Screen
                        name='ContainersList'
                        component={ContainersListScreen}
                        options={{
                            title: 'Список контейнеров',
                            headerStyle: {
                                backgroundColor: '#212529',
                            },
                            headerTintColor: '#c7c8c9',
                        }}
                    />
                    <Stack.Screen
                        name='ContainerInfo'
                        component={ContainerInfoScreen}
                        options={({ route }) => ({
                            title: route.params.marking || 'Информация о контейнере',
                            headerStyle: {
                                backgroundColor: '#212529',
                            },
                            headerTintColor: '#c7c8c9',
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}