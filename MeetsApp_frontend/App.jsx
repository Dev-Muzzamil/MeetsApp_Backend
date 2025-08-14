import './global.css';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Dashboard from "./components/dashboard";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ onNavigateToDashboard }) => (
  <SafeAreaView className="flex-1 bg-blue-50">
    <StatusBar barStyle="dark-content" backgroundColor="#eff6ff" />
    <View className="flex-1 justify-center items-center px-6">
      {/* Hero Section */}
      <View className="items-center mb-12">
        <View className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center mb-6 shadow-lg">
          <Text className="text-4xl text-white font-bold">M</Text>
        </View>
        <Text className="text-4xl font-bold text-gray-900 text-center mb-4">
          MeetsApp
        </Text>
        <Text className="text-lg text-gray-600 text-center leading-relaxed max-w-sm">
          Discover and manage events from institutions around you
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity 
        className="bg-blue-600 px-8 py-4 rounded-2xl shadow-lg active:scale-95 w-full max-w-sm"
        onPress={onNavigateToDashboard}
      >
        <Text className="text-white text-lg font-semibold text-center">
          View Institutions
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="absolute bottom-8 items-center">
        <Text className="text-gray-500 text-sm">
          Powered by React Native
        </Text>
      </View>
    </View>
  </SafeAreaView>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' or 'dashboard'

  if (currentScreen === 'home') {
    return <HomeScreen onNavigateToDashboard={() => setCurrentScreen('dashboard')} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <Dashboard onBackToHome={() => setCurrentScreen('home')} />
    </SafeAreaView>
  );
}
