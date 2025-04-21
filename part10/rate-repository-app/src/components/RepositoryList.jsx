import { StyleSheet, FlatList, View, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import RepositoryInfo from "./RepositoryInfo";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { AllRepositoriesOrderBy } from "../enums/AllRepositoriesOrderBy";
import { OrderDirection } from "../enums/OrderDirection";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const OrderByItems = [
  {
    label: "Latest repositories",
    orderBy: AllRepositoriesOrderBy.CREATED_AT,
    orderDirection: OrderDirection.DESC,
  },
  {
    label: "Highest rated repositories",
    orderBy: AllRepositoriesOrderBy.RATING_AVERAGE,
    orderDirection: OrderDirection.DESC,
  },
  {
    label: "Lowest rated repositories",
    orderBy: AllRepositoriesOrderBy.RATING_AVERAGE,
    orderDirection: OrderDirection.ASC,
  },
];

const OrderByPicker = ({ setOrderBy, setOrderDirection }) => {
  const [selectedOrderByItem, setSelectedOrderByItem] = useState(OrderByItems[0]);

  const handleOrderByChange = (item) => {
    setSelectedOrderByItem(item);
    setOrderBy(item.orderBy);
    setOrderDirection(item.orderDirection);
  };

  return (
    <Picker
      placeholder="Select order by"
      selectedValue={selectedOrderByItem}
      onValueChange={handleOrderByChange}
    >
      {OrderByItems.map((item) => (
        <Picker.Item
          key={item.label}
          label={item.label}
          value={item}
        />
      ))}
    </Picker>
  );
};

export const RepositoryListContainer = ({ repositories, setOrderBy, setOrderDirection }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryInfo repository={item} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
        <OrderByPicker
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
        />
      )}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(AllRepositoriesOrderBy.CREATED_AT);
  const [orderDirection, setOrderDirection] = useState(OrderDirection.DESC);
  const { repositories } = useRepositories({ orderBy, orderDirection });

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
    />
  );
};

export default RepositoryList;
