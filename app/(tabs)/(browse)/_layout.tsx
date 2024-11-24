import { useTheme } from '@/components/context/ThemeContext';
import { Stack } from 'expo-router';

export default function IndexLayout() {
  const { theme } = useTheme()

  return (
    <Stack screenOptions={{
        headerStyle: {
          backgroundColor: theme.primary,
        }
    }}>
      <Stack.Screen
        name="index"
        options={{ title: 'Browse Characters', headerShown: false }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: 'Character Details', headerShown: true }}
      />
    </Stack>
  );
}
