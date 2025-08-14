import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StatusBar } from "react-native";
import { getAllInstitutions } from "../api/institution";
import { getAllEvents } from "../api/events";
import { SafeAreaView } from "react-native-safe-area-context";
import InstitutionList from "./institutionList";
import EventsList from "./eventsList";

export default function Dashboard({ onBackToHome }) {
  const [institutions, setInstitutions] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('institutions'); // 'institutions' or 'events'
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  useEffect(() => {
    getAllInstitutions().then(res => {
      setInstitutions(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleViewEvents = async (institutionId, institutionName) => {
    setEventsLoading(true);
    setSelectedInstitution({ id: institutionId, name: institutionName });
    
    try {
      const response = await getAllEvents(institutionId);
      setEvents(response.data);
      setCurrentView('events');
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleBackToInstitutions = () => {
    setCurrentView('institutions');
    setSelectedInstitution(null);
    setEvents([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <StatusBar barStyle="dark-content" backgroundColor="#eff6ff" />
      
      {/* Header */}
      <View className="px-6 py-4">
        <TouchableOpacity 
          onPress={onBackToHome}
          className="flex-row items-center mb-6"
        >
          <Text className="text-blue-600 text-lg mr-2">←</Text>
          <Text className="text-blue-600 text-base font-medium">Back to Home</Text>
        </TouchableOpacity>
        
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center mb-4 shadow-lg">
            <Text className="text-2xl text-white font-bold">
              {currentView === 'institutions' ? '🏫' : '📅'}
            </Text>
          </View>
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            {currentView === 'institutions' ? 'Institutions' : 'Events'}
          </Text>
          <Text className="text-gray-600 text-center text-base">
            {currentView === 'institutions' 
              ? 'Discover educational institutions and their events'
              : `Events from ${selectedInstitution?.name}`
            }
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        {currentView === 'institutions' ? (
          <View className="flex-1">
            {loading ? (
              <View className="flex-1 justify-center items-center">
                <View className="bg-white rounded-2xl p-8 shadow-lg items-center">
                  <ActivityIndicator size="large" color="#2563eb" />
                  <Text className="text-gray-600 mt-4 text-base font-medium">Loading institutions...</Text>
                  <Text className="text-gray-400 text-sm mt-2 text-center">Please wait while we fetch the data</Text>
                </View>
              </View>
            ) : (
              <InstitutionList 
                institutions={institutions} 
                onViewEvents={handleViewEvents}
              />
            )}
          </View>
        ) : (
          <View className="flex-1">
            {eventsLoading ? (
              <View className="flex-1 justify-center items-center">
                <View className="bg-white rounded-2xl p-8 shadow-lg items-center">
                  <ActivityIndicator size="large" color="#2563eb" />
                  <Text className="text-gray-600 mt-4 text-base font-medium">Loading events...</Text>
                  <Text className="text-gray-400 text-sm mt-2 text-center">Fetching latest events for you</Text>
                </View>
              </View>
            ) : (
              <EventsList
                events={events}
                onBack={handleBackToInstitutions}
                institutionName={selectedInstitution?.name}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}