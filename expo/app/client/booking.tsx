import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft, MapPin, Star, Calendar, DollarSign, Info } from "lucide-react-native";
import Colors from "@/constants/colors";
import { services } from "@/mocks/data";

export default function BookingScreen() {
  const router = useRouter();
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();
  
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Service not found</Text>
      </SafeAreaView>
    );
  }

  const handleBooking = () => {
    Alert.alert(
      "Booking Confirmed",
      `Your booking for ${service.title} has been placed. You'll receive confirmation shortly.`,
      [
        {
          text: "View My Bookings",
          onPress: () => router.push("/client/dashboard"),
        },
        {
          text: "Browse More",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Service</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.serviceSection}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.providerName}>{service.providerName}</Text>

          {service.rating && (
            <View style={styles.ratingContainer}>
              <Star size={16} color={Colors.warning} fill={Colors.warning} />
              <Text style={styles.ratingText}>{service.rating}</Text>
              <Text style={styles.reviewCount}>({service.totalReviews} reviews)</Text>
            </View>
          )}
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <Text style={styles.description}>{service.description}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <MapPin size={20} color={Colors.accent} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Service Area</Text>
              <Text style={styles.infoValue}>{service.serviceArea}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <DollarSign size={20} color={Colors.success} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Price Range</Text>
              <Text style={styles.infoValue}>
                ${service.priceMin}
                {service.priceMax && ` - $${service.priceMax}`}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Calendar size={20} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Availability</Text>
              <Text style={styles.infoValue}>Contact provider for scheduling</Text>
            </View>
          </View>
        </View>

        <View style={styles.commissionNotice}>
          <Info size={18} color={Colors.accent} />
          <Text style={styles.commissionText}>
            All payments are processed securely through Aevara. Transparent pricing with no hidden fees.
          </Text>
        </View>

        <View style={styles.pricingBreakdown}>
          <Text style={styles.sectionTitle}>Estimated Pricing</Text>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Service Fee</Text>
            <Text style={styles.breakdownValue}>${service.priceMin}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Platform Fee (10%)</Text>
            <Text style={styles.breakdownValue}>${(service.priceMin * 0.1).toFixed(2)}</Text>
          </View>
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalValue}>${(service.priceMin * 1.1).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerLabel}>Estimated Total</Text>
          <Text style={styles.footerPrice}>${(service.priceMin * 1.1).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  serviceSection: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  providerName: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.textTertiary,
  },
  detailsSection: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  infoSection: {
    gap: 12,
    marginBottom: 16,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  commissionNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.accent + "10",
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 16,
  },
  commissionText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  pricingBreakdown: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  breakdownLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  footerLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footerPrice: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.white,
  },
});
