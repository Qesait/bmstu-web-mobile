import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useState, useEffect, React } from 'react';
import {imageBaseURL} from '../api'

const placeholder = require(`../assets/placeholder.jpg`)

export default function ContainerCard({ navigation, ...props }) {
    const [src, setSrc] = useState({ uri: `${imageBaseURL}/${props.uuid}.jpg`});
    console.log(src)

    const handlePress = () => {
        navigation.navigate('ContainerInfo', { uuid: props.uuid });
    };

    return (
        // <View style={styles.card}>
        <View>
            <Image
                style={styles.image}
                source={src}
                resizeMode='contain'
                onError={() => setSrc(placeholder)}
            />
            <View style={styles.container}>
                <Text style={styles.brandTitle}>{props.marking}</Text>
                <Text style={styles.text}>not implemented</Text>
            </View>
            <Button title='View details' onPress={handlePress} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: 320,
        backgroundColor: '#303030',
        borderRadius: 12,
        padding: 24,
        gap: 12,
        margin: 8,
    },
    image: { height: 320 },
    container: { display: 'flex', width: '100%', margin: 8 },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    brandTitle: { color: '#4287f5', fontSize: 16 },
    text: { color: '#f0f0f0', fontSize: 16 },
});