import React, { useEffect, useRef, useState } from "react";
import { Button, Row, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { GetAllProducts } from "../../../redux/features/product/getAllProduct";
import ProductList from "./productItem";
import { FaFilter } from "react-icons/fa6";
import FilterDrawer from "../filter/productFilter";
import { motion } from 'framer-motion';
const AllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { GetAllProductsData, GetAllProductsLoad } = useSelector((state: any) => state.GetAllProductAction);
  console.log("GetAllProductsData", GetAllProductsData);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
  const [hasMore, setHasMore] = useState(true); 
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(GetAllProducts(pagination)).then((response: any) => {
      if (response.payload.length < pagination.limit) {
        setHasMore(false);
      }
    });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore) {
        loadMoreProducts();
      }
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
    };
  }, [hasMore]);

  const loadMoreProducts = () => {
    setPagination((prevPagination) => {
      const newOffset = prevPagination.offset + prevPagination.limit;
      const newPagination = { ...prevPagination, offset: newOffset };

      dispatch(GetAllProducts(newPagination)).then((response: any) => {
        if (response.payload.length < newPagination.limit) {
          setHasMore(false);
        }
      });
      return newPagination;
    });
  };

  const handleFilterClick = () => {
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // You can implement additional logic to filter products based on the selected category
  };

  return (
    <motion.div initial={{ y: 200, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>

    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip title="FILTER">
          <Button type="primary" shape="circle" icon={<FaFilter />} onClick={handleFilterClick} />
        </Tooltip>
      </div> 
      <Row>
        <ProductList products={GetAllProductsData} grid={true} />
        <div ref={sentinelRef} style={{ height: "20px", width: "100%" }}></div>
        {GetAllProductsLoad && hasMore && <p>Loading more products...</p>}
        {!hasMore && <p>No more products to load.</p>}
      </Row>

      {/* Use the FilterDrawer component */}
      <FilterDrawer
        visible={drawerVisible}
        onClose={handleDrawerClose}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
    </div>
    </motion.div>
  );
};

export default AllProducts;
