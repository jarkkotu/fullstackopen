import { StyleSheet, FlatList, View, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useNavigate } from "react-router-native";
import RepositoryInfo from "./RepositoryInfo";
import useRepositories from "../hooks/useRepositories";
import React, { useState } from "react";
import { AllRepositoriesOrderBy } from "../enums/AllRepositoriesOrderBy";
import { OrderDirection } from "../enums/OrderDirection";
import { useDebounce } from "use-debounce";

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

const GetOrderByItem = (orderBy, orderDirection) => {
  return OrderByItems.find((item) => item.orderBy === orderBy && item.orderDirection === orderDirection);
};

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  orderBy,
  orderDirection,
  setOrderBy,
  setOrderDirection,
}) => {
  const [selectedOrderByItem, setSelectedOrderByItem] = useState(GetOrderByItem(orderBy, orderDirection));

  const handleSearchKeywordChange = (keyword) => {
    setSearchKeyword(keyword);
  };
  const handleOrderByChange = (item) => {
    setSelectedOrderByItem(item);
    setOrderBy(item.orderBy);
    setOrderDirection(item.orderDirection);
  };

  return (
    <View>
      <Searchbar
        placeholder="Search for repositories"
        onChangeText={handleSearchKeywordChange}
        value={searchKeyword}
      />
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
    </View>
  );
};

const RepositoryListItem = ({ repository }) => {
  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(`/repository/${repository.id}`)}>
      <RepositoryInfo repository={repository} />
    </Pressable>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchKeyword, setSearchKeyword, orderBy, orderDirection, setOrderBy, setOrderDirection } = this.props;

    return (
      <RepositoryListHeader
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        orderBy={orderBy}
        orderDirection={orderDirection}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    );
  };

  render() {
    const { repositories, onEndReached } = this.props;

    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <RepositoryListItem repository={item} />}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const [orderBy, setOrderBy] = useState(AllRepositoriesOrderBy.CREATED_AT);
  const [orderDirection, setOrderDirection] = useState(OrderDirection.DESC);
  const { repositories, fetchMore } = useRepositories({ first: 8, orderBy, orderDirection, debouncedSearchKeyword });

  return (
    <RepositoryListContainer
      repositories={repositories}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      orderBy={orderBy}
      orderDirection={orderDirection}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      onEndReached={() => {
        fetchMore();
      }}
    />
  );
};

export default RepositoryList;
