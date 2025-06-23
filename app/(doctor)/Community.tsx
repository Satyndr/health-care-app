import CommunityBall from "@/components/common/CommunityBall";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Community = () => {
  const router = useRouter();
  const [notificationCount, setNotificationCount] = React.useState(2);
  const [notificationModalVisible, setNotificationModalVisible] =
    React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("1");
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newPostContent, setNewPostContent] = React.useState("");
  const [addingPost, setAddingPost] = React.useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = React.useState(false);
  const [activePostId, setActivePostId] = React.useState<string | null>(null);
  const [commentInput, setCommentInput] = React.useState("");
  const [addingComment, setAddingComment] = React.useState(false);
  const [commentsData, setCommentsData] = React.useState<{
    [postId: string]: string[];
  }>({});
  const [postsData, setPostsData] = React.useState({
    "1": [
      {
        id: "1",
        user: "Holo D. Wiesewolf",
        time: "3m ago",
        content:
          "I've been struggling with severe headaches for years, but recently I've found some relief with thanks to Doc Nightingale AI. I feel #goodbye/associate #nightingale.coids",
        likes: "9.4M",
        comments: "0",
        views: "58%",
        trending: true,
        avatar: require("@/assets/doctor/profile.png"),
      },
      {
        id: "2",
        user: "Jane Doe",
        time: "10m ago",
        content:
          "Anyone else dealing with chronic migraines? What treatments have worked for you? #Disease",
        likes: "1.2M",
        comments: "0",
        views: "8%",
        trending: false,
        avatar: require("@/assets/doctor/profile.png"),
      },
    ],
    "2": [
      {
        id: "3",
        user: "John Smith",
        time: "1h ago",
        content:
          "Started a new workout routine and feeling great! #Health #Wellness",
        likes: "2.1M",
        comments: "0",
        views: "15%",
        trending: false,
        avatar: require("@/assets/doctor/profile.png"),
      },
      {
        id: "4",
        user: "Emily Rose",
        time: "2h ago",
        content:
          "Tips for maintaining a balanced diet? Share your favorite healthy recipes! #Health",
        likes: "900K",
        comments: "0",
        views: "5%",
        trending: false,
        avatar: require("@/assets/doctor/profile.png"),
      },
    ],
    "3": [
      {
        id: "5",
        user: "Dr. Nightingale",
        time: "5m ago",
        content:
          "Excited to announce a new telemedicine feature for our patients! #Doctor #Innovation",
        likes: "3.5M",
        comments: "0",
        views: "30%",
        trending: true,
        avatar: require("@/assets/doctor/profile.png"),
      },
      {
        id: "6",
        user: "Dr. Watson",
        time: "20m ago",
        content: "How do you build trust with new patients? #Doctor #Advice",
        likes: "1.1M",
        comments: "0",
        views: "12%",
        trending: false,
        avatar: require("@/assets/doctor/profile.png"),
      },
    ],
    "4": [
      {
        id: "7",
        user: "Alex Green",
        time: "Just now",
        content:
          "What are the best ways to stay motivated for daily exercise? #Today #Motivation",
        likes: "500K",
        comments: "0",
        views: "2%",
        trending: false,
        avatar: require("@/assets/doctor/profile.png"),
      },
      {
        id: "8",
        user: "Sara Blue",
        time: "7m ago",
        content:
          "Is anyone else struggling with allergies today? #Today #Allergies",
        likes: "300K",
        comments: "0",
        views: "1%",
        trending: false,
        avatar: require("@/assets/doctor/profile.png"),
      },
    ],
  });

  const notifications = [
    { id: 1, text: "Your appointment with Dr. Smith is confirmed." },
    { id: 2, text: "New message from Dr. Nightingale." },
  ];

  const categories = [
    { id: "1", name: "Disease" },
    { id: "2", name: "Health" },
    { id: "3", name: "Doctor" },
    { id: "4", name: "Today" },
  ];

  // Filtered posts based on selected tab
  const filteredPosts = React.useMemo(() => {
    return postsData[selectedCategory as keyof typeof postsData] || [];
  }, [selectedCategory, postsData]);

  // Refresh handler
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Add new post handler
  const handleAddPost = () => {
    if (!newPostContent.trim()) return;
    setAddingPost(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        user: "Me",
        time: "Just now",
        content: newPostContent,
        likes: "0",
        comments: "0",
        views: "0",
        trending: false,
        avatar: require("@/assets/doctor/profile.png"),
      };
      // Add to selected category (fix type error)
      const key = selectedCategory as keyof typeof postsData;
      // Instead of mutating postsData directly, use a state for postsData
      setPostsData((prev) => ({
        ...prev,
        [key]: [newPost, ...(prev[key] || [])],
      }));
      setNewPostContent("");
      setModalVisible(false);
      setAddingPost(false);
    }, 500);
  };

  // Open comments modal for a post
  const openComments = (postId: string) => {
    setActivePostId(postId);
    setCommentsModalVisible(true);
  };

  // Add comment handler
  const handleAddComment = () => {
    if (!commentInput.trim() || !activePostId) return;
    setAddingComment(true);
    setTimeout(() => {
      setCommentsData((prev) => ({
        ...prev,
        [activePostId]: [...(prev[activePostId] || []), commentInput],
      }));
      setCommentInput("");
      setAddingComment(false);
    }, 400);
  };

  const renderPost = ({ item }: any) => (
    <Pressable style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.postTime}>Posted: {item.time}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      <View style={styles.postStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.likes}</Text>
          <Text style={styles.statLabel}>Holo The Wise Not</Text>
        </View>
        <Pressable
          style={styles.statItem}
          onPress={() => openComments(item.id)}
        >
          <Text style={styles.statValue}>{item.comments}</Text>
          <Text style={styles.statLabel}>Comments</Text>
        </Pressable>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.views}</Text>
          <Text style={styles.statLabel}>Trending</Text>
        </View>
      </View>
      {/* Show comments below post if this post is active */}
      {activePostId === item.id && commentsModalVisible && (
        <View style={styles.commentsInlineContainer}>
          <Text style={styles.commentsInlineTitle}>Comments</Text>
          <ScrollView style={{ maxHeight: 120, marginBottom: 8 }}>
            {(commentsData[item.id] || []).length === 0 ? (
              <Text style={{ color: "#888", textAlign: "center" }}>
                No comments yet.
              </Text>
            ) : (
              commentsData[item.id].map((c, idx) => (
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <Image
                    source={require("@/assets/doctor/profile.png")}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      marginRight: 8,
                    }}
                  />
                  <Text style={{ color: "#333" }}>{c}</Text>
                </View>
              ))
            )}
          </ScrollView>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[
                styles.input,
                { flex: 1, minHeight: 36, marginBottom: 0 },
              ]}
              placeholder="Add a comment..."
              value={commentInput}
              onChangeText={setCommentInput}
              multiline
              numberOfLines={2}
            />
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: Colors.custom.color2, marginLeft: 8 },
              ]}
              onPress={handleAddComment}
              disabled={addingComment || !commentInput.trim()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {addingComment ? "..." : "Send"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Remove the extra Open Comments button below the inline comments */}
      {/* <Pressable
        style={styles.commentButton}
        onPress={() => openComments(item.id)}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={18}
          color={Colors.custom.color2}
        />
        <Text style={styles.commentButtonText}>Open Comments</Text>
      </Pressable> */}
      {item.trending && (
        <View style={styles.trendingBadge}>
          <Text style={styles.trendingText}>Trending</Text>
        </View>
      )}
    </Pressable>
  );

  const renderCategory = ({ item }: any) => (
    <Pressable
      style={[
        styles.categoryItem,
        selectedCategory === item.id && {
          backgroundColor: Colors.custom.color2,
        },
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && { color: "#FFF" },
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.categoryCount,
          selectedCategory === item.id && { color: "#FFF" },
        ]}
      >
        1M
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommunityBall onPress={() => setModalVisible(true)} />
      {/* New Post Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Post</Text>
            <TextInput
              style={styles.input}
              placeholder="What's on your mind?"
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              numberOfLines={4}
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: Colors.custom.color2, marginRight: 10 },
                ]}
                onPress={handleAddPost}
                disabled={addingPost || !newPostContent.trim()}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {addingPost ? "Posting..." : "Post"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
                disabled={addingPost}
              >
                <Text style={{ color: "#333" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Header Bar like appointments */}
      <View
        style={{
          width: "100%",
          backgroundColor: Colors.custom.color1,
          paddingVertical: "4%",
          paddingLeft: "5%",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          Community
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: "5%" }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse By</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Posts</Text>
          {filteredPosts.map((item) => (
            <React.Fragment key={item.id}>
              {renderPost({ item })}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // paddingHorizontal: 15,
  },
  notificationBadge: {
    backgroundColor: "rgba(210, 131, 207, 0.2)",
    padding: 10,
    borderRadius: 10,
  },
  notificationText: {
    color: Colors.custom.color2,
    fontWeight: "500",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  categoryList: {
    paddingBottom: 5,
  },
  categoryItem: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.custom.color2,
  },
  categoryText: {
    color: Colors.custom.color2,
    fontWeight: "500",
    marginRight: 5,
  },
  categoryCount: {
    color: Colors.custom.color2,
    fontWeight: "bold",
  },
  postList: {
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  postContent: {
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
    lineHeight: 20,
  },
  postStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.custom.color2,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  trendingBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: Colors.custom.color2,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  trendingText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  notificationIconContainer: {
    marginLeft: 10,
    padding: 5,
  },
  notificationBadgeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.custom.color2,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  addPostButton: {
    marginLeft: 10,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.custom.color2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
    marginBottom: 15,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "rgba(210, 131, 207, 0.08)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  commentButtonText: {
    color: Colors.custom.color2,
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 13,
  },
  commentsInlineContainer: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  commentsInlineTitle: {
    fontWeight: "bold",
    color: Colors.custom.color2,
    marginBottom: 5,
    fontSize: 14,
  },
  notificationBox: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  notificationBoxText: {
    color: "#333",
    fontSize: 15,
  },
});

export default Community;
