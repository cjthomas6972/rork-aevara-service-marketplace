import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LogOut, DollarSign, Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react-native";
import Colors from "@/constants/colors";
import { bookings } from "@/mocks/data";
import { useAuth } from "@/contexts/AuthContext";

export default function ProviderDashboardScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const providerBookings = bookings.filter((b) => b.providerId === user?.id);
  const totalEarnings = providerBookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.providerPayout, 0);
  const pendingJobs = providerBookings.filter((b) => b.status === "pending" || b.status === "confirmed");

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return Colors.success;
      case "confirmed":
        return Colors.accent;
      case "pending":
        return Colors.warning;
      default:
        return Colors.textTertiary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>AEVARA</Text>
          <Text style={styles.subtitle}>Provider Dashboard</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <LogOut size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Welcome, {user?.name}</Text>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.statCardLarge]}>
            <DollarSign size={24} color={Colors.success} />
            <Text style={styles.statValue}>${totalEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <Calendar size={20} color={Colors.accent} />
            <Text style={styles.statValueSmall}>{providerBookings.length}</Text>
            <Text style={styles.statLabelSmall}>Total Jobs</Text>
          </View>
          <View style={styles.statCard}>
            <CheckCircle size={20} color={Colors.success} />
            <Text style={styles.statValueSmall}>
              {providerBookings.filter((b) => b.status === "completed").length}
            </Text>
            <Text style={styles.statLabelSmall}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={20} color={Colors.warning} />
            <Text style={styles.statValueSmall}>{pendingJobs.length}</Text>
            <Text style={styles.statLabelSmall}>Pending</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Jobs</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {pendingJobs.length === 0 ? (
            <View style={styles.emptyState}>
              <Calendar size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyStateText}>No active jobs</Text>
            </View>
          ) : (
            pendingJobs.map((booking) => (
              <View key={booking.id} style={styles.jobCard}>
                <View style={styles.jobHeader}>
                  <View style={styles.jobInfo}>
                    <Text style={styles.jobTitle}>{booking.serviceName}</Text>
                    <Text style={styles.clientName}>Client: {booking.clientName}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + "15" }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                      {booking.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.jobDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Your Payout:</Text>
                    <Text style={[styles.detailValue, styles.payoutValue]}>
                      ${booking.providerPayout}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceRow}>
              <TrendingUp size={20} color={Colors.accent} />
              <View style={styles.performanceInfo}>
                <Text style={styles.performanceLabel}>Average Job Value</Text>
                <Text style={styles.performanceValue}>
                  ${providerBookings.length > 0 
                    ? (providerBookings.reduce((sum, b) => sum + b.totalAmount, 0) / providerBookings.length).toFixed(2)
                    : "0.00"}
                </Text>
              </View>
            </View>
            <View style={styles.performanceRow}>
              <CheckCircle size={20} color={Colors.success} />
              <View style={styles.performanceInfo}>
                <Text style={styles.performanceLabel}>Completion Rate</Text>
                <Text style={styles.performanceValue}>
                  {providerBookings.length > 0
                    ? Math.round((providerBookings.filter((b) => b.status === "completed").length / providerBookings.length) * 100)
                    : 0}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>No Marketing Overhead</Text>
          <Text style={styles.infoText}>
            Focus on fulfilling great work. Aevara handles client acquisition through our marketer network.
            You keep 80% of every transaction.
          </Text>
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
  logo: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
    minWidth: "47%",
    alignItems: "center",
  },
  statCardLarge: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: Colors.success,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statValueSmall: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.primary,
    marginTop: 8,
  },
  statLabelSmall: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  viewAll: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: "500" as const,
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
  },
  jobCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600" as const,
    textTransform: "capitalize" as const,
  },
  jobDetails: {
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
  payoutValue: {
    color: Colors.success,
    fontSize: 16,
  },
  performanceCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 16,
  },
  performanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  performanceInfo: {
    flex: 1,
  },
  performanceLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  infoCard: {
    backgroundColor: Colors.accent + "10",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
