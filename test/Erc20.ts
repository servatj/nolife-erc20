import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("ERC20", function () {
  async function deployOneYearLockFixture() {
    const supply = 100000000;
    const name = "NoLifeCoin";
    const symbol = "NLFX";
    const decimals = 18;

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Nlfx = await hre.ethers.getContractFactory("Nlfx");
    const nlfx = await Nlfx.deploy({ value: supply});

    return { nlfx, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right name", async function () {
      const { nlfx } = await loadFixture(deployOneYearLockFixture);
      expect(await nlfx.name()).to.equal("NoLifeCoin")
    });

    it("Should set the right symbol", async function () {
      const { nlfx } = await loadFixture(deployOneYearLockFixture);
      expect(await nlfx.symbol()).to.equal("NLFX")
    });

    it("Should set the right decimals", async function () {
      const { nlfx } = await loadFixture(deployOneYearLockFixture);
      expect(await nlfx.decimals()).to.equal(18)
    });
  });

  describe("admin capabilities", function () {
    it("Should set the right admin", async function () {
      const { nlfx, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await nlfx.admin()).to.equal(owner.address);
    });
  });

});
