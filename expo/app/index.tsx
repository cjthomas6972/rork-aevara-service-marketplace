import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useCallback } from "react";
import { Building2, Users, TrendingUp, Shield } from "lucide-react-native";
import Colors from "@/constants/colors";
import { UserRole } from "@/types";

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { user, signIn } = useAuth();

  const navigateToRole = useCallback((role: UserRole) => {
    switch (role) {
      case "client":
        router.replace("/client/browse");
        break;
      case "provider":
        router.replace("/provider/dashboard");
        break;
      case "marketer":
        router.replace("/marketer/dashboard");
        break;
      case "admin":
        router.replace("/admin/dashboard");
        break;
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      navigateToRole(user.role);
    }
  }, [user, navigateToRole]);

  const handleRoleSelect = async (role: UserRole) => {
    await signIn(role);
  };

  const roles = [
    {
      role: "client" as UserRole,
      title: "Client",
      description: "Browse and book services",
      icon: Users,
      color: Colors.accent,
    },
    {
      role: "provider" as UserRole,
      title: "Service Provider",
      description: "List services and fulfill work",
      icon: Building2,
      color: Colors.success,
    },
    {
      role: "marketer" as UserRole,
      title: "Marketer",
      description: "Refer clients and earn 10% forever",
      icon: TrendingUp,
      color: Colors.warning,
    },
    {
      role: "admin" as UserRole,
      title: "Admin",
      description: "Platform governance and metrics",
      icon: Shield,
      color: Colors.primary,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logo}>AEVARA</Text>
        <Text style={styles.tagline}>Economic Infrastructure</Text>
      </View>

      <View style={styles.principle}>
        <Text style={styles.principleText}>10% today. 10% tomorrow. 10% forever.</Text>
      </View>

      <View style={styles.rolesContainer}>
        <Text style={styles.sectionTitle}>Select Your Role</Text>
        {roles.map((item) => (
          <TouchableOpacity
            key={item.role}
            style={[styles.roleCard, { borderLeftColor: item.color }]}
            onPress={() => handleRoleSelect(item.role)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color + "15" }]}>
              <item.icon size={24} color={item.color} />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleTitle}>{item.title}</Text>
              <Text style={styles.roleDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Aevara is a service-marketplace infrastructure platform.{"\n"}
          Not a gig app. Not an agency. Real economic opportunity.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  principle: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  principleText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    textAlign: "center",
    lineHeight: 24,
  },
  rolesContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 16,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: "center",
    lineHeight: 18,
  },
});
