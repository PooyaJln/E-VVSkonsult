-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema heatLossApp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema heatLossApp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heatLossApp` ;
USE `heatLossApp` ;

-- -----------------------------------------------------
-- Table `heatLossApp`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`project` (
  `project_id` INT NOT NULL,
  `project_name` VARCHAR(96) NOT NULL,
  PRIMARY KEY (`project_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`users` (
  `user_id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Role` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`projectUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`projectUser` (
  `projectUser_id` INT NOT NULL,
  `project_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`projectUser_id`),
  INDEX `fk_projectUser_1_idx` (`project_id` ASC) VISIBLE,
  INDEX `fk_projectUser_2_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_id`
    FOREIGN KEY (`project_id`)
    REFERENCES `heatLossApp`.`project` (`project_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `heatLossApp`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`buildings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`buildings` (
  `building_id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `project_id` INT NOT NULL,
  PRIMARY KEY (`building_id`),
  INDEX `fk_buildings_1_idx` (`project_id` ASC) VISIBLE,
  CONSTRAINT `fk1_project_Id`
    FOREIGN KEY (`project_id`)
    REFERENCES `heatLossApp`.`project` (`project_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`Storeys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`Storeys` (
  `Storey_id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `building_id` INT NOT NULL,
  PRIMARY KEY (`Storey_id`),
  INDEX `fk_Storey_1_idx` (`building_id` ASC) VISIBLE,
  CONSTRAINT `fk_building_Id`
    FOREIGN KEY (`building_id`)
    REFERENCES `heatLossApp`.`buildings` (`building_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`apartments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`apartments` (
  `apartment_id` INT NOT NULL,
  `apartment_name` VARCHAR(45) NOT NULL,
  `storey_id` INT NOT NULL,
  PRIMARY KEY (`apartment_id`),
  INDEX `storeyId_FK_idx` (`storey_id` ASC) VISIBLE,
  CONSTRAINT `fk_storeyId`
    FOREIGN KEY (`storey_id`)
    REFERENCES `heatLossApp`.`Storeys` (`Storey_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`rooms` (
  `room_id` INT NOT NULL,
  `room_name` VARCHAR(45) NULL,
  `apartment_id` INT NULL,
  PRIMARY KEY (`room_id`),
  INDEX `fk_apartmentId_idx` (`apartment_id` ASC) VISIBLE,
  CONSTRAINT `fk_apartment_Id`
    FOREIGN KEY (`apartment_id`)
    REFERENCES `heatLossApp`.`apartments` (`apartment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`roomTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`roomTypes` (
  `roomType_id` INT NOT NULL,
  `roomType_name` VARCHAR(45) NOT NULL,
  `roomtype_temp` INT NOT NULL,
  PRIMARY KEY (`roomType_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`boundaryType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`boundaryType` (
  `boundaryType_id` INT NOT NULL,
  `boundaryType_name` VARCHAR(45) NULL,
  `boundaryType_catg` VARCHAR(45) NULL,
  `boundaryType_uValue` DECIMAL NULL,
  PRIMARY KEY (`boundaryType_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`roomBoundaries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`roomBoundaries` (
  `roomBoundary_id` INT NOT NULL,
  `roomBoundary_desc` VARCHAR(45) NULL,
  `room_id` INT NOT NULL,
  `outdoor_temp` INT NOT NULL,
  `indoor_temp` INT NOT NULL,
  `boundary_area` INT NOT NULL,
  `hasOpening` TINYINT NOT NULL,
  `openingArea` DECIMAL NOT NULL,
  `boundaryType_id` INT NOT NULL,
  PRIMARY KEY (`roomBoundary_id`),
  INDEX `fk_in_temp_id_idx` (`indoor_temp` ASC) VISIBLE,
  INDEX `fk_out_temp_id_idx` (`outdoor_temp` ASC) VISIBLE,
  INDEX `fk_boundaryType_id_idx` (`boundaryType_id` ASC) VISIBLE,
  CONSTRAINT `fk_in_temp_id`
    FOREIGN KEY (`indoor_temp`)
    REFERENCES `heatLossApp`.`roomTypes` (`roomType_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_out_temp_id`
    FOREIGN KEY (`outdoor_temp`)
    REFERENCES `heatLossApp`.`roomTypes` (`roomType_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_boundaryType_id`
    FOREIGN KEY (`boundaryType_id`)
    REFERENCES `heatLossApp`.`boundaryType` (`boundaryType_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`openings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`openings` (
  `opening_id` INT NOT NULL,
  `roomBoundary_id` INT NOT NULL,
  `opening_type_id` INT NOT NULL,
  `opening_area` DECIMAL NOT NULL,
  `indoor_temp` INT NOT NULL,
  `outdoor_temp` INT NOT NULL,
  PRIMARY KEY (`opening_id`),
  INDEX `fk_opening_type_id_idx` (`opening_type_id` ASC) VISIBLE,
  INDEX `fk_in_temp_id_idx` (`indoor_temp` ASC) VISIBLE,
  INDEX `fk_out_temp_id_idx` (`outdoor_temp` ASC) VISIBLE,
  CONSTRAINT `fk_opening_type_id`
    FOREIGN KEY (`opening_type_id`)
    REFERENCES `heatLossApp`.`boundaryType` (`boundaryType_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_in_temp_id`
    FOREIGN KEY (`indoor_temp`)
    REFERENCES `heatLossApp`.`roomTypes` (`roomType_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_out_temp_id`
    FOREIGN KEY (`outdoor_temp`)
    REFERENCES `heatLossApp`.`roomTypes` (`roomType_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heatLossApp`.`roomBoundary_opening`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heatLossApp`.`roomBoundary_opening` (
  `roomBoundary_id` INT NOT NULL,
  `opening_id` INT NULL,
  PRIMARY KEY (`roomBoundary_id`),
  INDEX `fk_opening_id_idx` (`opening_id` ASC) VISIBLE,
  CONSTRAINT `fk_roomBoundary_id`
    FOREIGN KEY ()
    REFERENCES `heatLossApp`.`roomBoundaries` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_opening_id`
    FOREIGN KEY (`opening_id`)
    REFERENCES `heatLossApp`.`openings` (`opening_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
