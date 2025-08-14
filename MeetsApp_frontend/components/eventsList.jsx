import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const EmptyComponent = () => (
  <View className="flex-1 justify-center items-center py-12">
    <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6 shadow-lg">
      <Text className="text-4xl">📅</Text>
    </View>
    <Text className="text-xl font-bold text-gray-900 text-center mb-2">No events found</Text>
    <Text className="text-gray-600 text-center leading-relaxed max-w-sm">
      This institution has no upcoming events at the moment
    </Text>
  </View>
);

export default function EventsList({ events, onBack, institutionName }) {
  return (
    <View className="flex-1">
      {/* Back Button */}
      <View className="mb-6">
        <TouchableOpacity 
          onPress={onBack}
          className="bg-white px-6 py-3 rounded-2xl shadow-lg active:scale-95 self-start"
        >
          <Text className="text-blue-600 font-semibold text-base">← Back to Institutions</Text>
        </TouchableOpacity>
      </View>

      {/* Events List */}
      <FlatList
        data={events}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        className="pb-5"
        renderItem={({ item }) => (
          <View className="mb-6 bg-white rounded-2xl shadow-lg overflow-hidden">
            <View className="p-6">
              {/* Event Header */}
              <View className="items-center mb-4">
                <Text className="text-lg font-bold text-gray-900 text-center mb-2 leading-tight">
                  {item.title}
                </Text>
                <Text className="text-gray-600 text-center leading-relaxed text-sm">
                  {item.description}
                </Text>
              </View>
              
              {/* Event Details */}
              <View className="bg-gray-50 rounded-xl p-4">
                <View className="flex-row justify-between items-center mb-2">
                  <View className="flex-row items-center flex-1">
                    <Text className="text-blue-500 text-lg mr-2">📅</Text>
                    <View>
                      <Text className="text-blue-600 font-semibold">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View className="flex-row items-center">
                  <Text className="text-green-500 text-lg mr-2">📍</Text>
                  <Text className="text-gray-700 font-medium">
                    {item.location}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
}
