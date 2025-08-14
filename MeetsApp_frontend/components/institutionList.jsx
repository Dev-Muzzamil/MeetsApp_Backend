import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const EmptyComponent = () => (
  <View className="flex-1 justify-center items-center py-12">
    <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6 shadow-lg">
      <Text className="text-4xl">🏫</Text>
    </View>
    <Text className="text-xl font-bold text-gray-900 text-center mb-2">No institutions found</Text>
    <Text className="text-gray-600 text-center leading-relaxed max-w-sm">
      Check back later for updates or contact support
    </Text>
  </View>
);

export default function InstitutionList({ institutions, onViewEvents }) {
  return (
    <FlatList
      data={institutions}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      className="pb-5"
      renderItem={({ item }) => (
        <View className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden">
          <View className="p-6">
            {/* Institution Header */}
            <View className="items-center mb-6">

              <Text className="text-xl font-bold text-gray-900 text-center mb-2 leading-tight">
                {item.name}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-blue-500 text-sm mr-1">📍</Text>
                <Text className="text-gray-600 text-center">
                  {item.location}
                </Text>
              </View>
            </View>
            
            {/* Action Button */}
            <TouchableOpacity 
              className="bg-blue-600 py-4 rounded-2xl shadow-lg active:scale-95"
              onPress={() => onViewEvents(item._id, item.name)}
            >
              <Text className="text-white text-lg font-semibold text-center">
                View Events
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      ListEmptyComponent={EmptyComponent}
    />
  );
}