import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("ERC20", function () {
  async function deployOneYearLockFixture() {
    const supply = 1000000000;
    const name = "NoLifeCoin";
    const symbol = "NLFX";
    const decimals = 18;

    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Nlfx = await hre.ethers.getContractFactory("Nlfx");
    const nlfx = await Nlfx.deploy(name, symbol, supply, decimals);

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

    it("Should set the right owner", async function () {
      const { nlfx, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await nlfx.owner()).to.equal(owner.address);
    });

    it("Should transfer the funds to the owner", async function () {
      const { nlfx } = await loadFixture(deployOneYearLockFixture);

      expect(await nlfx.balanceOf(nlfx.owner())).to.equal(1000000000);
    });
  });

  describe("Burning", () => {
    it("Should burn tokens from the owner's address", async () => {
      const { nlfx, owner } = await loadFixture(deployOneYearLockFixture);

      await nlfx.burn(1000000000);
      const ownerBalance: bigint = await nlfx.balanceOf(owner.address);
      expect(ownerBalance).to.equal(0);
    });
  });
});
