import { useRouter } from 'expo-router';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 p-6 justify-center">
      <TouchableOpacity
        onPress={() => router.push('/chat')}
        className="bg-white p-5 rounded-xl flex-row items-center justify-center shadow-md"
        style={{
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <MaterialIcons name="chat" size={32} color="#3b82f6" />
        <View className="ml-4">
          <Text className="text-xl font-bold text-blue-500">
            Start Diagnosis
          </Text>
          <Text className="text-gray-600">
            Get instant car repair help
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}