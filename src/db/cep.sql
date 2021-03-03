-- phpMyAdmin SQL Dump
-- version 4.4.15.1
-- http://www.phpmyadmin.net
--
-- Host: mysql743.umbler.com
-- Generation Time: 03-Mar-2021 às 15:35
-- Versão do servidor: 5.6.50
-- PHP Version: 5.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dgm_cep`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cidades`
--

CREATE TABLE IF NOT EXISTS `cidades` (
  `CID_ID` int(11) NOT NULL,
  `CID_NOME` varchar(255) NOT NULL,
  `PRE_ID` int(11) DEFAULT NULL,
  `CID_POPULACAO` double DEFAULT NULL,
  `UF_ID` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estrutura da tabela `prefeitos`
--

CREATE TABLE IF NOT EXISTS `prefeitos` (
  `PRE_ID` int(11) NOT NULL,
  `PRE_NOME` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `prefeitos`
--



-- --------------------------------------------------------

--
-- Estrutura da tabela `ufs`
--

CREATE TABLE IF NOT EXISTS `ufs` (
  `UF_ID` int(11) NOT NULL,
  `UF_NOME` varchar(255) NOT NULL,
  `UF_SIGLA` varchar(2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `ufs`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`CID_ID`),
  ADD KEY `FK_UF_CIDADE` (`UF_ID`);

--
-- Indexes for table `prefeitos`
--
ALTER TABLE `prefeitos`
  ADD PRIMARY KEY (`PRE_ID`);

--
-- Indexes for table `ufs`
--
ALTER TABLE `ufs`
  ADD PRIMARY KEY (`UF_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cidades`
--
ALTER TABLE `cidades`
  MODIFY `CID_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `prefeitos`
--
ALTER TABLE `prefeitos`
  MODIFY `PRE_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `ufs`
--
ALTER TABLE `ufs`
  MODIFY `UF_ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `cidades`
--
ALTER TABLE `cidades`
  ADD CONSTRAINT `FK_UF_CIDADE` FOREIGN KEY (`UF_ID`) REFERENCES `ufs` (`UF_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
