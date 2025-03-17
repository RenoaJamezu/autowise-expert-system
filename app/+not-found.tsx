import { Link, Stack } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center bg-gray-100 p-6">
        {/* Title */}
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Page Not Found
        </Text>

        {/* Description */}
        <Text className="text-lg text-gray-600 text-center mb-8">
          The page you're looking for doesn't exist or has been moved.
        </Text>

        {/* Go Home Button */}
        <Link href="/" className="w-full items-center">
          <View className="flex-row items-center justify-center bg-blue-500 py-3 px-6 rounded-lg w-4/5">
            <MaterialIcons name="home" size={20} color="#fff" />
            <Text className="text-white text-lg font-semibold ml-2">
              Go to Home
            </Text>
          </View>
        </Link>
      </View>
    </>
  );
}