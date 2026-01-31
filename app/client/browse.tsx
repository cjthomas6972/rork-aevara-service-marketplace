import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Search, Star, MapPin, LogOut } from "lucide-react-native";
import Colors from "@/constants/colors";
import { serviceCategories, services } from "@/mocks/data";
import { useAuth } from "@/contexts/AuthContext";

export default function ClientBrowseScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesCategory = !selectedCategory || service.categoryId === selectedCategory;
    const matchesSearch = !searchQuery || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>AEVARA</Text>
          <Text style={styles.welcome}>Welcome, {user?.name}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textTertiary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor={Colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.categoryChip,
                !selectedCategory && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  !selectedCategory && styles.categoryChipTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            {serviceCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category.id && styles.categoryChipTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>
            {filteredServices.length} Services Available
          </Text>
          {filteredServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => router.push(`/client/booking?serviceId=${service.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.serviceHeader}>
                <View style={styles.serviceHeaderLeft}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.providerName}>{service.providerName}</Text>
                </View>
                {service.rating && (
                  <View style={styles.ratingContainer}>
                    <Star size={14} color={Colors.warning} fill={Colors.warning} />
                    <Text style={styles.ratingText}>{service.rating}</Text>
                    <Text style={styles.reviewCount}>({service.totalReviews})</Text>
                  </View>
                )}
              </View>

              <Text style={styles.serviceDescription} numberOfLines={2}>
                {service.description}
              </Text>

              <View style={styles.serviceFooter}>
                <View style={styles.locationContainer}>
                  <MapPin size={14} color={Colors.textTertiary} />
                  <Text style={styles.locationText}>{service.serviceArea}</Text>
                </View>
                <Text style={styles.priceText}>
                  ${service.priceMin}
                  {service.priceMax && ` - $${service.priceMax}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => router.push("/client/dashboard")}
      >
        <Text style={styles.dashboardButtonText}>My Bookings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.primary,
    letterSpacing: 1,
  },
  welcome: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    margin: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: Colors.text,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  servicesSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  serviceHeaderLeft: {
    flex: 1,
    marginRight: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  providerName: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: Colors.textTertiary,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  dashboardButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  dashboardButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.white,
  },
});
