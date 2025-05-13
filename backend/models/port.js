'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Port extends Model {
    static associate(models) {
    }
  }
  Port.init({
    fuel_type_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    station_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     intersection_directions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plus4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    station_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expected_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    groups_with_access_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    access_days_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cards_accepted: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bd_blends: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ng_fill_type_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ng_psi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ev_level1_evse_num: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ev_level2_evse_num: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ev_dc_fast_count: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ev_other_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ev_network: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ev_network_web: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geocode_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_last_confirmed: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    id1: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    owner_type_code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    federal_agency_id: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    federal_agency_name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    open_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    hydrogen_status_link: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ng_vehicle_class: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lpg_primary: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    e85_blender_pump: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ev_connector_types: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    intersection_directions_french: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    access_days_time_french: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    bd_blends_french: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    groups_with_access_code_french: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    hydrogen_is_retail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    access_code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    access_detail_code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    federal_agency_code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    facility_type: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cng_dispenser_num: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cng_on_site_renewable_source: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cng_total_compression_capacity: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cng_storage_capacity: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lng_on_site_renewable_source: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    e85_other_ethanol_blends: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ev_pricing: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ev_pricing_french: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lpg_nozzle_types: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    hydrogen_pressures: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    hydrogen_standards: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cng_fill_type_code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cng_psi: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cng_vehicle_class: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lng_vehicle_class: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ev_on_site_renewable_source: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    restricted_access: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    rd_blends: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    rd_blends_french: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    rd_blended_with_biodiesel: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    rd_maximum_biodiesel_level: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    nps_unit_name: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    cng_station_sells_renewable_natural_gas: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    lng_station_sells_renewable_natural_gas: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    maximum_vehicle_class: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    ev_workplace_charging: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    funding_sources: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    }
  },
    {
      sequelize,
      modelName: 'Port',
      tableName: "ports",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true
    });
  return Port;
};