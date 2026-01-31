import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Calendar, CheckCircle, Clock, XCircle } from "lucide-react-native";
import Colors from "@/constants/colors";
import { bookings } from "@/mocks/data";
import { useAuth } from "@/contexts/AuthContext";

export default function ClientDashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const userBookings = bookings.filter((b) => b.clientId === user?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={20} color={Colors.success} />;
      case "confirmed":
        return <Clock size={20} color={Colors.accent} />;
      case "pending":
        return <Clock size={20} color={Colors.warning} />;
      case "cancelled":
        return <XCircle size={20} color={Colors.error} />;
      default:
        return <Clock size={20} color={Colors.textTertiary} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return Colors.success;
      case "confirmed":
        return Colors.accent;
      case "pending":
        return Colors.warning;
      case "cancelled":
        return Colors.error;
      default:
        return Colors.textTertiary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userBookings.length}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {userBookings.filter((b) => b.status === "completed").length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              ${userBookings.reduce((sum, b) => sum + b.totalAmount, 0).toFixed(0)}
            </Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        <View style={styles.bookingsSection}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          {userBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyStateText}>No bookings yet</Text>
              <TouchableOpacity
                style={styles.browseButton}
                onPress={() => router.push("/client/browse")}
              >
                <Text style={styles.browseButtonText}>Browse Services</Text>
              </TouchableOpacity>
            </View>
          ) : (
            userBookings.map((booking) => (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingHeaderLeft}>
                    <Text style={styles.bookingTitle}>{booking.serviceName}</Text>
                    <Text style={styles.providerName}>{booking.providerName}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + "15" }]}>
                    {getStatusIcon(booking.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                      {booking.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Total:</Text>
                    <Text style={styles.detailValue}>${booking.totalAmount}</Text>
                  </View>
                  {booking.marketerName && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Referred by:</Text>
                      <Text style={styles.detailValue}>{booking.marketerName}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
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
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  bookingsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: Colors.white,
    padding: 40,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyStateText: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 16,
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.white,
  },
  bookingCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bookingHeaderLeft: {
    flex: 1,
    marginRight: 12,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  providerName: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600" as const,
    textTransform: "capitalize" as const,
  },
  bookingDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.text,
  },
});
